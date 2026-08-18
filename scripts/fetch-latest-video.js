import fs from 'fs';
import https from 'https';

const CHANNEL_ID = 'UCZkTiNo5UhIcP9XHWG4tGZg';
const CHANNEL_URL = 'https://www.youtube.com/@alexandrerobbie';

const OUTPUT_PATH = 'public/latest-video.json';

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
 * Extrai a data do programa diretamente do título.
 *
 * Exemplo:
 * PROGRAMA SHOW DA MANHÃ COM ALEXANDRE ROBBIE - 18 DE AGOSTO 2026
 *
 * Retorna:
 * 2026-08-18
 */
function extractProgramDate(title) {
  if (!title) return null;

  const match = title.match(
    /(\d{1,2})\s+DE\s+([A-ZÇÃÕÁÉÍÓÚÂÊÔÜ]+)\s+(\d{4})/i
  );

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const monthName = match[2].toUpperCase();
  const year = Number(match[3]);

  const months = {
    JANEIRO: 1,
    FEVEREIRO: 2,
    MARÇO: 3,
    ABRIL: 4,
    MAIO: 5,
    JUNHO: 6,
    JULHO: 7,
    AGOSTO: 8,
    SETEMBRO: 9,
    OUTUBRO: 10,
    NOVEMBRO: 11,
    DEZEMBRO: 12,
  };

  const month = months[monthName];

  if (!month) {
    return null;
  }

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Busca o programa mais recente no RSS oficial do YouTube.
 */
async function fetchLatestVideoFromRss() {
  const RSS_FEED_URL =
    `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  console.log('🔎 Consultando RSS oficial do YouTube...');

  const data = await get(RSS_FEED_URL);

  const entries = [
    ...data.matchAll(/<entry>([\s\S]*?)<\/entry>/g),
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
        programDate: extractProgramDate(title),
      };
    })
    .filter((video) => {
      if (!video.videoId) return false;

      return /show da manhã|show da manha/i.test(
        video.title || ''
      );
    });

  if (!videos.length) {
    throw new Error(
      'Nenhum programa do Show da Manhã encontrado no RSS do YouTube.'
    );
  }

  console.log('');
  console.log('📺 PROGRAMAS ENCONTRADOS');
  console.log('');

  videos.forEach((video) => {
    console.log(
      `${video.programDate || 'SEM DATA'} | ${video.title}`
    );
  });

  /**
   * Primeiro critério:
   * data do programa escrita no título.
   *
   * Segundo critério:
   * data de publicação no YouTube.
   */
  videos.sort((a, b) => {
    const dateA = a.programDate || '';
    const dateB = b.programDate || '';

    if (dateA !== dateB) {
      return dateB.localeCompare(dateA);
    }

    return (
      new Date(b.published || 0) -
      new Date(a.published || 0)
    );
  });

  const latestVideo = videos[0];

  console.log('');
  console.log('==========================================');
  console.log('✓ PROGRAMA MAIS RECENTE');
  console.log('==========================================');
  console.log(`ID: ${latestVideo.videoId}`);
  console.log(`Título: ${latestVideo.title}`);
  console.log(`Data do programa: ${latestVideo.programDate}`);
  console.log(`Publicado: ${latestVideo.published}`);
  console.log('==========================================');
  console.log('');

  return latestVideo;
}

/**
 * Executa a busca e salva o JSON.
 */
async function fetchLatestVideo() {
  const latestVideo = await fetchLatestVideoFromRss();

  let currentVideo = null;

  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      currentVideo = JSON.parse(
        fs.readFileSync(OUTPUT_PATH, 'utf8')
      );
    } catch {
      currentVideo = null;
    }
  }

  /**
   * Proteção contra regressão:
   *
   * Se o arquivo atual contém um programa mais recente,
   * não substituímos por um programa antigo.
   */
  if (
    currentVideo?.programDate &&
    latestVideo.programDate &&
    latestVideo.programDate < currentVideo.programDate
  ) {
    console.log('');
    console.log('⚠️ NOVO RESULTADO É MAIS ANTIGO QUE O ATUAL.');
    console.log(`Atual: ${currentVideo.programDate}`);
    console.log(`Encontrado: ${latestVideo.programDate}`);
    console.log('Mantendo o vídeo atual.');
    console.log('');

    return currentVideo;
  }

  const latestVideoData = {
    videoId: latestVideo.videoId,
    title: latestVideo.title || '',
    programDate: latestVideo.programDate || null,
    publishedAt: latestVideo.published || null,
    updatedAt: latestVideo.updated || null,
    fetchedAt: new Date().toISOString(),
    channelId: CHANNEL_ID,
    channelUrl: CHANNEL_URL,
  };

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(latestVideoData, null, 2),
    'utf8'
  );

  console.log('==========================================');
  console.log('✓ VÍDEO MAIS RECENTE SALVO');
  console.log('==========================================');
  console.log(`Video ID: ${latestVideoData.videoId}`);
  console.log(`Título: ${latestVideoData.title}`);
  console.log(`Data do programa: ${latestVideoData.programDate}`);
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