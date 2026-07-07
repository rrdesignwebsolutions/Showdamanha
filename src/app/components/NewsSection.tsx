import { useEffect, useMemo, useState } from 'react';
import { Newspaper, ArrowRight, Clock } from 'lucide-react';

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  description: string;
  category?: string;
}

const categoryColors: Record<string, string> = {
  'G1 Sul de Minas': '#6B9FE8',
  'G1 Brasil': '#6BD98A',
  'Agência Brasil': '#E8922A',
  Itatiaia: '#C9A961',
  'EPTV Sul de Minas': '#E87ACF',
  NewsAPI: '#7AC9E8',
};

const MAX_ITEMS = 9;

function formatAge(timestamp: string | null) {
  if (!timestamp) return 'Ainda não atualizado';
  const minutes = Math.round((Date.now() - new Date(timestamp).getTime()) / 60000);
  if (minutes <= 0) return 'Atualizado agora';
  if (minutes === 1) return 'Atualizado há 1 minuto';
  if (minutes < 60) return `Atualizado há ${minutes} minutos`;
  const hours = Math.floor(minutes / 60);
  return hours === 1 ? 'Atualizado há 1 hora' : `Atualizado há ${hours} horas`;
}

function sanitizeText(value: string | undefined | null) {
  if (!value) return '';
  return String(value)
    .replace(/<img[^>]*>/gi, ' ')
    .replace(/<[^>]+>/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isItajubaNews(item: NewsItem) {
  return /itajub[áa]/i.test(`${item.title} ${item.description} ${item.source}`);
}

function isLocalNews(item: NewsItem) {
  return ['G1 Sul de Minas', 'EPTV Sul de Minas', 'Itatiaia'].includes(item.source);
}

export function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const items = useMemo(() => newsItems.slice(0, MAX_ITEMS), [newsItems]);

  const sanitizedItems = useMemo(
    () =>
      items
        .map((item) => ({
          ...item,
          title: sanitizeText(item.title),
          description: sanitizeText(item.description),
        }))
        .sort((a, b) => {
          const aItajuba = isItajubaNews(a) ? 2 : 0;
          const bItajuba = isItajubaNews(b) ? 2 : 0;
          const aLocal = isLocalNews(a) ? 1 : 0;
          const bLocal = isLocalNews(b) ? 1 : 0;
          const aScore = aItajuba + aLocal;
          const bScore = bItajuba + bLocal;
          if (aScore !== bScore) {
            return bScore - aScore;
          }
          return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        }),
    [items],
  );

  const NEWS_CACHE_KEY = 'showdamanha-news-cache';

  function loadCachedNews() {
    try {
      const rawCache = window.localStorage.getItem(NEWS_CACHE_KEY);
      if (!rawCache) return;
      const cached = JSON.parse(rawCache) as { items?: NewsItem[]; updatedAt?: string };
      if (cached.items?.length) {
        setNewsItems(cached.items.slice(0, MAX_ITEMS));
      }
      if (cached.updatedAt) {
        setUpdatedAt(cached.updatedAt);
      }
    } catch {
      // Ignore invalid cache
    }
  }

  async function refreshNews() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/news.json?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error(`Erro ao carregar notícias: ${response.status}`);
      }
      const json = await response.json();
      const items = json.items ?? [];
      const updated = json.updatedAt ?? new Date().toISOString();

      setNewsItems(items.slice(0, MAX_ITEMS));
      setUpdatedAt(updated);
      window.localStorage.setItem(
        NEWS_CACHE_KEY,
        JSON.stringify({ items: items.slice(0, MAX_ITEMS), updatedAt: updated }),
      );
    } catch (err) {
      console.error(err);
      setError('Não foi possível atualizar as notícias. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCachedNews();
    refreshNews();
    const interval = setInterval(refreshNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
          <Newspaper className="w-6 h-6 text-[#C9A961]" />
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
        </div>
        <h2 className="text-3xl sm:text-4xl text-[#C9A961] tracking-widest mb-3">
          ÚLTIMAS NOTÍCIAS
        </h2>
      </div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl p-7 animate-pulse"
              style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.15)' }}
            >
              <div className="h-4 bg-[#2D1B10] rounded w-3/4 mb-4" />
              <div className="h-4 bg-[#2D1B10] rounded w-full mb-2" />
              <div className="h-4 bg-[#2D1B10] rounded w-5/6 mb-4" />
              <div className="h-4 bg-[#2D1B10] rounded w-1/2 mt-auto" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center text-sm text-[#E08B5F] mb-6">{error}</div>
      )}

      {!loading && !items.length && !error && (
        <div className="text-center text-[#B8956A]">Nenhuma notícia disponível no momento.</div>
      )}

      {!loading && sanitizedItems.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sanitizedItems.map(({ title, description, link, source, pubDate, category }) => {
            const tag = category || source || 'Notícias';
            const catColor = categoryColors[tag] || '#C9A961';
            const dateLabel = pubDate ? new Date(pubDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Data indisponível';

            return (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl p-7 flex flex-col gap-4 transition-transform hover:-translate-y-1 hover:bg-[#24150a]"
                style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.15)' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs tracking-wider"
                    style={{ background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}40` }}
                  >
                    {category || source}
                  </span>
                  <div className="flex items-center gap-1 text-[#5A4030] text-xs">
                    <Clock className="w-3 h-3" />
                    {dateLabel}
                  </div>
                </div>

                <h3 className="text-[#E8C87A] leading-snug">{title}</h3>
                <p className="text-[#7A6040] text-sm leading-relaxed flex-1">{description}</p>

                <div
                  className="flex items-center gap-2 pt-4"
                  style={{ borderTop: '1px solid rgba(201,169,97,0.1)' }}
                >
                  <span className="text-[#5A4030] text-xs">Ver notícia completa</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9A961] ml-auto" />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
