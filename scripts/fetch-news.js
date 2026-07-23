import fs from 'fs';
import path from 'path';

const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

async function fetchNews() {
  if (!NEWSAPI_KEY) {
    console.error('Erro: A variável de ambiente NEWSAPI_KEY não está definida.');
    process.exit(1);
  }

  // Exemplo buscando notícias do Brasil em português (você pode customizar a query ou categoria)
  const url = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${NEWSAPI_KEY}`;

  try {
    console.log('Buscando notícias...');
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(`Erro na API do NewsAPI: ${data.message || 'Desconhecido'}`);
    }

    // Formata os dados para salvar apenas o necessário
    const newsItems = data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source.name
    }));

    const outputDir = path.resolve('public');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'news.json');
    fs.writeFileSync(outputPath, JSON.stringify(newsItems, null, 2), 'utf-8');
    
    console.log(`Sucesso! ${newsItems.length} notícias salvas em ${outputPath}`);
  } catch (error) {
    console.error('Erro ao buscar ou salvar as notícias:', error);
    process.exit(1);
  }
}

fetchNews();