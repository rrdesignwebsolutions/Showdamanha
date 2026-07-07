export interface NewsItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  description: string;
  category?: string;
}

const RSS_PROXY = 'https://api.allorigins.win/raw?url=';

const RSS_FEEDS = [
  { label: 'G1 Sul de Minas', url: 'https://g1.globo.com/mg/sul-de-minas-e-vales/rss2.xml' },
  { label: 'G1 Brasil', url: 'https://g1.globo.com/rss/g1/' },
  { label: 'Agência Brasil', url: 'https://agenciabrasil.ebc.com.br/rss.xml' },
  { label: 'Itatiaia', url: 'https://www.itatiaia.com.br/rss.xml' },
  { label: 'EPTV Sul de Minas', url: 'https://g1.globo.com/mg/sul-de-minas-e-vales/rss2.xml' },
];

const NEWS_API_QUERY = 'Itajubá OR Itatiaia OR Sul de Minas OR EPTV OR Brasil';
const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/everything';

function getTextContent(value: string | null): string {
  return value?.trim() ?? '';
}

function decodeHtml(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

function parseRss(xml: string, sourceLabel: string): NewsItem[] {
  const parser = new DOMParser();
  const document = parser.parseFromString(xml, 'application/xml');
  const items = Array.from(document.querySelectorAll('item'));

  return items.map((item) => {
    const title = getTextContent(item.querySelector('title')?.textContent);
    const link = getTextContent(item.querySelector('link')?.textContent);
    const rawDescription = item.querySelector('description')?.textContent ?? '';
    const description = decodeHtml(rawDescription).slice(0, 200);
    const category = getTextContent(item.querySelector('category')?.textContent);
    const pubDate = getTextContent(item.querySelector('pubDate')?.textContent);
    return {
      title,
      link,
      source: sourceLabel,
      description,
      category: category || sourceLabel,
      pubDate,
    };
  });
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(`${RSS_PROXY}${encodeURIComponent(url)}`);
  if (!response.ok) {
    throw new Error(`Falha ao buscar RSS: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

async function fetchRssFeeds(): Promise<NewsItem[]> {
  const promises = RSS_FEEDS.map(async ({ label, url }) => {
    try {
      const xml = await fetchText(url);
      return parseRss(xml, label);
    } catch (error) {
      console.warn(`RSS failed for ${label}:`, error);
      return [] as NewsItem[];
    }
  });

  const feeds = await Promise.all(promises);
  return feeds.flat();
}

export async function fetchNewsApi(apiKey: string): Promise<NewsItem[]> {
  if (!apiKey) return [];

  const url = new URL(NEWS_API_ENDPOINT);
  url.searchParams.set('q', NEWS_API_QUERY);
  url.searchParams.set('language', 'pt');
  url.searchParams.set('pageSize', '12');
  url.searchParams.set('sortBy', 'publishedAt');

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: apiKey,
    },
  });
  if (!response.ok) {
    throw new Error(`NewsAPI falhou: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.status !== 'ok') {
    throw new Error(`NewsAPI retornou status ${json.status}`);
  }

  return json.articles.map((article: any) => ({
    title: getTextContent(article.title),
    link: getTextContent(article.url),
    source: getTextContent(article.source?.name) || 'NewsAPI',
    description: decodeHtml(getTextContent(article.description || article.content || '')).slice(0, 200),
    category: getTextContent(article.source?.name) || 'Brasil',
    pubDate: getTextContent(article.publishedAt),
  }));
}

export async function loadLatestNews(): Promise<NewsItem[]> {
  const rssItems = await fetchRssFeeds();

  const apiKey = import.meta.env.VITE_NEWSAPI_KEY as string | undefined;
  const newsApiItems = apiKey ? await fetchNewsApi(apiKey) : [];

  const allItems = [...rssItems, ...newsApiItems];
  const uniqueMap = new Map<string, NewsItem>();

  allItems
    .filter((item) => item.title && item.link)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .forEach((item) => {
      if (!uniqueMap.has(item.link)) {
        uniqueMap.set(item.link, item);
      }
    });

  return Array.from(uniqueMap.values()).slice(0, 12);
}
