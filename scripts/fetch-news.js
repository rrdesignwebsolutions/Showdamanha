import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';

async function fetchG1News() {
  const rssUrl = 'https://g1.globo.com/dynamo/mg/sul-de-minas/rss2.xml';

  try {
    console.log('Buscando notícias do G1 Sul de Minas...');

    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151.0 Safari/537.36',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erro ao acessar o RSS do G1: ${response.status} ${response.statusText}`
      );
    }

    const xmlData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
    });

    const parsedResult = parser.parse(xmlData);
    const items = parsedResult?.rss?.channel?.item;

    if (!items) {
      throw new Error('Nenhuma notícia encontrada no feed RSS.');
    }

    const normalizedItems = Array.isArray(items) ? items : [items];

    console.log(`RSS retornou ${normalizedItems.length} itens.`);

    const newsItems = normalizedItems
      .map((item) => {
        const publishedAt = item.pubDate
          ? new Date(item.pubDate).toISOString()
          : null;

        return {
          title: item.title || '',
          description: item.description
            ? String(item.description).replace(/<[^>]*>?/gm, '').trim()
            : '',
          url: item.link || '',
          publishedAt,
          source: 'G1 Sul de Minas',
        };
      })
      .filter(
        (item) =>
          item.title &&
          item.publishedAt &&
          !/^\s*(vídeos|videos)\b/i.test(item.title)
      )
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      );

    console.log('\n=== NOTÍCIAS MAIS RECENTES ===');

    newsItems.slice(0, 10).forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.publishedAt} | ${item.title}`
      );
    });

    if (newsItems.length === 0) {
      throw new Error('Nenhuma notícia válida encontrada.');
    }

    const outputDir = path.resolve('public');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'news.json');

    const payload = {
      items: newsItems,
      updatedAt: new Date().toISOString(),
      source: 'G1 Sul de Minas',
    };

    fs.writeFileSync(
      outputPath,
      JSON.stringify(payload, null, 2),
      'utf-8'
    );

    console.log(`\nSucesso! ${newsItems.length} notícias salvas.`);
    console.log(`Arquivo: ${outputPath}`);
    console.log(`Atualizado em: ${payload.updatedAt}`);
  } catch (error) {
    console.error('Erro ao processar as notícias do G1:', error);
    process.exit(1);
  }
}

fetchG1News();