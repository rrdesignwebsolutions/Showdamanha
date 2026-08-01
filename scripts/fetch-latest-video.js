import fs from 'fs';
import https from 'https';

let CHANNEL_ID = 'UCZkTiNo5UhIcP9XHWG4tGZg';
const CHANNEL_URL = 'https://www.youtube.com/@alexandrerobbie';
const CHANNEL_VIDEOS_URL = 'https://www.youtube.com/@alexandrerobbie/videos';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      })
      .on('error', reject);
  });
}

async function extractChannelId() {
  const html = await get(CHANNEL_URL);
  const matches = [
    html.match(/"externalId":"(UC[^"]{21})"/),
    html.match(/"channelId":"(UC[^"]{21})"/),
    html.match(/UC[A-Za-z0-9_-]{21}/),
  ];

  for (const match of matches) {
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

async function extractVideoIdFromChannelPage() {
  const html = await get(CHANNEL_VIDEOS_URL);
  const uniqueVideoIds = [...new Set(
    [...html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map((match) => match[1]),
  )];

  if (!uniqueVideoIds.length) {
    throw new Error('Não foi possível localizar vídeos na página do canal.');
  }

  return uniqueVideoIds[0];
}

async function fetchLatestVideoFromRss() {
  const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const data = await get(RSS_FEED_URL);
  const match = data.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);

  if (!match || !match[1]) {
    throw new Error('Não foi possível extrair o vídeo ID do feed RSS');
  }

  return match[1];
}

async function fetchLatestVideo() {
  if (CHANNEL_ID === 'UC_SEU_CHANNEL_ID_AQUI') {
    console.log('🔍 Tentando descobrir Channel ID automaticamente...');
    const discoveredId = await extractChannelId();
    if (discoveredId) {
      CHANNEL_ID = discoveredId;
      console.log(`✓ Channel ID descoberto: ${CHANNEL_ID}`);
    } else {
      console.error('❌ Não foi possível descobrir o Channel ID automaticamente.');
      console.error('\nPor favor, configure manualmente em scripts/fetch-latest-video.js:');
      console.error('1. Vá para https://www.youtube.com/@seu_channel/about');
      console.error('2. Procure por "Channel ID"');
      console.error('3. Copie o ID e substitua em: const CHANNEL_ID = "SEU_ID_AQUI"');
      process.exit(1);
    }
  }

  let videoId = null;

  try {
    videoId = await extractVideoIdFromChannelPage();
    console.log(`✓ Vídeo obtido da página do canal: ${videoId}`);
  } catch (error) {
    console.warn('⚠️  Falha ao buscar pela página do canal. Tentando RSS...');
    videoId = await fetchLatestVideoFromRss();
  }

  const latestVideoData = {
    videoId,
    fetchedAt: new Date().toISOString(),
    channelId: CHANNEL_ID,
    channelUrl: CHANNEL_URL,
  };

  const outputPath = 'public/latest-video.json';
  fs.writeFileSync(outputPath, JSON.stringify(latestVideoData, null, 2));

  console.log(`✓ Vídeo mais recente salvo: ${videoId}`);
  return videoId;
}

fetchLatestVideo()
  .then(() => {
    console.log('✓ Script finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ ERRO:', error.message);
    console.error('\n⚠️  Instruções:');
    console.error('1. Abra https://www.youtube.com/@seu_channel/about');
    console.error('2. Procure por "Channel ID" na página');
    console.error('3. Copie o ID e atualize em scripts/fetch-latest-video.js:');
    console.error('   const CHANNEL_ID = "SEU_CHANNEL_ID_AQUI"');
    process.exit(1);
  });
