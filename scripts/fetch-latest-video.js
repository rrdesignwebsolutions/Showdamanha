import fs from 'fs';
import https from 'https';

const CHANNEL_ID = 'UCZkTiNo5UhIcP9XHWG4tGZg';
const CHANNEL_URL = 'https://www.youtube.com/@alexandrerobbie';

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': USER_AGENT,
            Accept: 'application/xml,text/xml,*/*',
          },
        },
        (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            if (
              res.statusCode >= 300 &&
              res.statusCode < 400 &&
              res.headers.location
            ) {
              get(res.headers.location)
                .then(resolve)
                .catch(reject);
              return;
            }

            if (res.statusCode !== 200) {
              reject(
                new Error(
                  `HTTP ${res.statusCode} ao acessar ${url}`
                )
              );
              return;
            }

            resolve(data);
          });
        }
      )
      .on('error', reject);
  });
}

/**
 * Busca o vídeo mais recente no RSS oficial do YouTube.
 */
async function fetchLatestVideoFromRss() {
  const RSS_FEED_URL =
    `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  console.log('🔎 Consultando RSS oficial do YouTube...');

  const data = await get(RSS_FEED_URL);

  const entries = [
    ...data.matchAll(
      /<entry>([\s\S]*?)<\/entry>/g
    ),
  ];

  if (!entries.length) {
    throw new Error(
      'Nenhum vídeo encontrado no RSS do YouTube.'
    );
  }

  const videos = entries
    .map((entry) => {
      const content = entry[1];

      const videoId =
        content.match(
          /<yt:videoId>([^<]+)<\/yt:videoId>/
        )?.[1];

      const title =
        content.match(
          /<title>([\s\S]*?)<\/title>/
        )?.[1];

      const published =
        content.match(
          /<published>([^<]+)<\/published>/
        )?.[1];

      const updated =
        content.match(
          /<updated>([^<]+)<\/updated>/
        )?.[1];

      return {
        videoId,
        title,
        published,
        updated,
      };
    })
    .filter((video) => video.videoId);

  if (!videos.length) {
    throw new Error(
      'O RSS foi encontrado, mas nenhum videoId foi localizado.'
    );
  }

  // Ordena pela data de publicação.
  videos.sort((a, b) => {
    return (
      new Date(b.published || 0) -
      new Date(a.published || 0)
    );
  });

  const latestVideo = videos[0];

  console.log('');
  console.log('📺 ÚLTIMO VÍDEO ENCONTRADO NO RSS');
  console.log(`ID: ${latestVideo.videoId}`);
  console.log(`Título: ${latestVideo.title}`);
  console.log(`Publicado: ${latestVideo.published}`);
  console.log('');

  return latestVideo;
}

/**
 * Executa a busca e salva o JSON.
 */
async function fetchLatestVideo() {
  const latestVideo = await fetchLatestVideoFromRss();

  const latestVideoData = {
    videoId: latestVideo.videoId,
    title: latestVideo.title || '',
    publishedAt: latestVideo.published || null,
    updatedAt: latestVideo.updated || null,
    fetchedAt: new Date().toISOString(),
    channelId: CHANNEL_ID,
    channelUrl: CHANNEL_URL,
  };

  const outputPath = 'public/latest-video.json';

  fs.writeFileSync(
    outputPath,
    JSON.stringify(latestVideoData, null, 2),
    'utf8'
  );

  console.log('==========================================');
  console.log('✓ VÍDEO MAIS RECENTE SALVO');
  console.log('==========================================');
  console.log(`Video ID: ${latestVideoData.videoId}`);
  console.log(`Título: ${latestVideoData.title}`);
  console.log(
    `URL: https://www.youtube.com/watch?v=${latestVideoData.videoId}`
  );
  console.log(
    `Publicado: ${latestVideoData.publishedAt}`
  );
  console.log(
    `Atualizado: ${latestVideoData.fetchedAt}`
  );
  console.log('==========================================');

  return latestVideoData;
}

fetchLatestVideo()
  .then(() => {
    console.log('✓ Script finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('');
    console.error('❌ ERRO:', error.message);
    process.exit(1);
  });