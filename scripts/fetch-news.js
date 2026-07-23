import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';

async function fetchG1News() {
  // Feed RSS oficial do G1 - Sul de Minas
  const rssUrl = 'https://g1.globo.com/dynamo/mg/sul-de-minas/rss2.xml';

  try {
    console.log('Buscando notícias do G1 Sul de Minas...');
    const response = await fetch(rssUrl);
    
    if (!response.ok) {
      throw new Error(`Erro ao acessar o RSS do G1: ${response.statusText}`);
    }

    const xmlData = await response.text();

    // Configura o parser para ler o XML do RSS
    const parser = new XMLParser({
      ignoreAttributes: false,
    });
    
    const parsedResult = parser.parse(xmlData);
    const items = parsedResult?.rss?.channel?.item;

    if (!items || !Array.isArray(items)) {
      throw new Error('Nenhuma notícia encontrada no feed RSS.');
    }

    // Formata os dados das notícias do G1
    const newsItems = items.map(item => ({
      title: item.title || '',
      description: item.description ? item.description.replace(/<[^>]*>?/gm, '') : '', // Remove tags HTML se houver
      url: item.link || '',
      publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      source: 'G1 Sul de Minas'
    }));

    const outputDir = path.resolve('public');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'news.json');
    fs.writeFileSync(outputPath, JSON.stringify(newsItems, null, 2), 'utf-8');
    
    console.log(`Sucesso! ${newsItems.length} notícias do G1 salvas em ${outputPath}`);
  } catch (error) {
    console.error('Erro ao processar as notícias do G1:', error);
    process.exit(1);
  }
}

fetchG1News();