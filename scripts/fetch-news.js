import fs from 'node:fs/promises';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const FEEDS = [
  { label: 'G1 Sul de Minas', url: 'https://g1.globo.com/rss/g1/mg/sul-de-minas-e-vales/' },
  { label: 'G1 Sul de Minas', url: 'https://g1.globo.com/rss/g1/mg/sul-de-minas/' },
  { label: 'G1 Brasil', url: 'https://g1.globo.com/rss/g1/' },
  { label: 'Agência Brasil', url: 'https://agenciabrasil.ebc.com.br/rss.xml' },
  { label: 'BBC Brasil', url: 'https://feeds.bbci.co.uk/portuguese/rss.xml' },
  { label: 'Reuters Mundo', url: 'https://feeds.feedburner.com/Reuters/worldNews' },
];

const NEWS_API_QUERY = 'Itajubá OR Itatiaia OR Sul de Minas OR Minas Gerais OR EPTV OR Brasil OR "Show da Manhã" OR "Panorama FM"';
const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/everything';
const OUTPUT_FILE = path.resolve(process.cwd(), 'public', 'news.json');

function parseDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date(0) : date;
}

function sanitizeHtml(value) {
  if (!value) return '';
  return String(value)
    .replace(/<img[^>]*>/gi, ' ')
    .replace(/<[^>]+>/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeText(value) {
  if (!value) return '';
  return sanitizeHtml(String(value));
}

function isItajubaItem(item) {
  const text = `${item.title} ${item.description} ${item.source}`;
  return /itajub[áa]/i.test(text);
}

function parseRssItems(xml, source) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    parseNodeValue: true,
    trimValues: true,
  });
  const parsed = parser.parse(xml);

  const channel = parsed.rss?.channel || parsed.feed;
  if (!channel) return [];

  let items = channel.item || channel.entry || [];
  if (!Array.isArray(items)) items = [items];

  return items
    .map((item) => {
      const title = normalizeText(item.title?.['#text'] || item.title || '');
      const link = normalizeText(
        item.link?.['#text'] || item.link?.['@_href'] || item.link || item.guid?.['#text'] || item.guid?.['@_href'] || item.guid || '',
      );
      const description = normalizeText(
        item.description || item.summary || item['content:encoded'] || item['media:description'] || item['dc:description'] || '',
      );
      const pubDate = normalizeText(item.pubDate || item.published || item.updated || '');
      const category = normalizeText(item.category?.['#text'] || item.category || source);

      return {
        title,
        link,
        source,
        description: description.slice(0, 240),
        category: category || source,
        pubDate,
      };
    })
    .filter((item) => item.title && item.link);
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.text();
}

async function fetchNewsApi(apiKey) {
  if (!apiKey) return [];

  const url = new URL(NEWS_API_ENDPOINT);
  url.searchParams.set('q', NEWS_API_QUERY);
  url.searchParams.set('language', 'pt');
  url.searchParams.set('pageSize', '20');
  url.searchParams.set('sortBy', 'publishedAt');

  const res = await fetch(url.toString(), {
    headers: { Authorization: apiKey },
  });

  if (!res.ok) {
    throw new Error(`NewsAPI error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.status !== 'ok') {
    throw new Error(`NewsAPI returned ${json.status}`);
  }

  return json.articles
    .map((article) => ({
      title: normalizeText(article.title),
      link: normalizeText(article.url),
      source: normalizeText(article.source?.name || 'NewsAPI'),
      description: normalizeText(article.description || article.content || '').slice(0, 240),
      category: normalizeText(article.source?.name || 'Brasil'),
      pubDate: normalizeText(article.publishedAt || ''),
    }))
    .filter((item) => item.title && item.link);
}

async function run() {
  const items = [];

  for (const feed of FEEDS) {
    try {
      const xml = await fetchText(feed.url);
      const feedItems = parseRssItems(xml, feed.label);
      items.push(...feedItems);
      console.log(`Loaded ${feedItems.length} itens de ${feed.label}`);
    } catch (error) {
      console.warn(`Falha ao carregar feed ${feed.label}: ${error.message}`);
    }
  }

  const apiKey = process.env.NEWSAPI_KEY || process.env.VITE_NEWSAPI_KEY;
  if (apiKey) {
    try {
      const newsApiItems = await fetchNewsApi(apiKey);
      items.push(...newsApiItems);
      console.log(`Loaded ${newsApiItems.length} itens do NewsAPI`);
    } catch (error) {
      console.warn(`Falha no NewsAPI: ${error.message}`);
    }
  }

  const localSources = ['G1 Sul de Minas', 'EPTV Sul de Minas', 'Itatiaia'];
  const unique = new Map();
  items
    .sort((a, b) => {
      const aItajuba = isItajubaItem(a) ? 2 : 0;
      const bItajuba = isItajubaItem(b) ? 2 : 0;
      const aLocal = localSources.includes(a.source) ? 1 : 0;
      const bLocal = localSources.includes(b.source) ? 1 : 0;
      const aScore = aItajuba + aLocal;
      const bScore = bItajuba + bLocal;
      if (aScore !== bScore) {
        return bScore - aScore;
      }
      return parseDate(b.pubDate) - parseDate(a.pubDate);
    })
    .forEach((item) => {
      if (!unique.has(item.link)) {
        unique.set(item.link, item);
      }
    });

  const output = {
    updatedAt: new Date().toISOString(),
    items: Array.from(unique.values()).slice(0, 18),
  };

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Saved ${output.items.length} noticias em ${OUTPUT_FILE}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
