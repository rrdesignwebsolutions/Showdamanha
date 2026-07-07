import fs from 'fs';
import https from 'https';

// Channel ID do canal Show da Manhã
// Atualizado com o ID fornecido pelo cliente
let CHANNEL_ID = 'UCZkTiNo5UhIcP9XHWG4tGZg';

// Alternativa: Use a URL do canal
const CHANNEL_URL = 'https://www.youtube.com/@alexandre_robbie';

// Tenta extrair Channel ID automaticamente
async function extractChannelId() {
  return new Promise((resolve) => {
    https
      .get(CHANNEL_URL, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          // Procura por "externalId" ou "channelId" no HTML
          const matches = [
            data.match(/"externalId":"(UC[^"]{21})"/),
            data.match(/"channelId":"(UC[^"]{21})"/),
            data.match(/UC[A-Za-z0-9_-]{21}/),
          ];
          
          for (const match of matches) {
            if (match && match[1]) {
              resolve(match[1]);
              return;
            }
          }
          resolve(null);
        });
      })
      .on('error', () => resolve(null));
  });
}

async function fetchLatestVideo() {
  // Se o Channel ID não foi atualizado, tenta descobrir automaticamente
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

  const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  return new Promise((resolve, reject) => {
    https
      .get(RSS_FEED_URL, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            // Extrair o primeiro video ID do feed RSS
            // Padrão: <yt:videoId>XXXXX</yt:videoId>
            const match = data.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
            
            if (match && match[1]) {
              const videoId = match[1];
              const timestamp = new Date().toISOString();

              const latestVideoData = {
                videoId,
                fetchedAt: timestamp,
                channelUrl: CHANNEL_URL,
              };

              // Salvar em public/latest-video.json
              const outputPath = 'public/latest-video.json';
              fs.writeFileSync(outputPath, JSON.stringify(latestVideoData, null, 2));

              console.log(`✓ Vídeo mais recente salvo: ${videoId}`);
              resolve(videoId);
            } else {
              throw new Error('Não foi possível extrair o vídeo ID do feed');
            }
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Executar
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
