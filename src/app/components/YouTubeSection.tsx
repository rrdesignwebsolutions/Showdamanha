import { useState } from 'react';
import { Youtube, ExternalLink, Play } from 'lucide-react';
import { LiveModal } from './LiveModal';

export function YouTubeSection() {
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const youtubeChannelUrl = 'https://www.youtube.com/@alexandrerobbie';

  const liveCard = {
    title: 'Próxima Live',
    subtitle: 'Segunda a Sábado · 7h45 às 11h',
    desc: 'Acompanhe o Alexandre Robbie em transmissão ao vivo no YouTube e participe em tempo real.',
    cta: 'Assistir no YouTube',
  };

  const handlePlayClick = async () => {
    setIsLiveModalOpen(true);
    setLoadingVideo(true);
    setVideoId(null);

    try {
      const response = await fetch('/latest-video.json');
      if (response.ok) {
        const data = await response.json();
        setVideoId(data.videoId ?? null);
      } else {
        console.error('Falha ao carregar latest-video.json');
        setVideoId(null);
      }
    } catch (error) {
      console.error('Erro ao buscar vídeo:', error);
      setVideoId(null);
    } finally {
      setLoadingVideo(false);
    }
  };

  return (
    <div className="space-y-10">
      <LiveModal isOpen={isLiveModalOpen} onClose={() => setIsLiveModalOpen(false)} videoId={videoId} loading={loadingVideo} />
      {/* Section header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
          <Youtube className="w-6 h-6 text-[#C9A961]" />
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
        </div>
        <h2 className="text-3xl sm:text-4xl text-[#C9A961] tracking-widest mb-3">
          PRÓXIMA LIVE
        </h2>
        <p className="text-[#B8956A] text-lg">
          Acompanhe ao vivo no YouTube e não perca a próxima transmissão
        </p>
      </div>

      {/* Live card */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.2)' }}>
        <button
          onClick={handlePlayClick}
          type="button"
          className="group relative aspect-video flex w-full items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2A1205 0%, #120803 100%)' }}
        >
          <img
            src="/yt-cover-alexandre.png"
            alt="Capa da live do YouTube"
            className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
            onError={(event) => {
              const target = event.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/25 transition duration-300 group-hover:bg-black/35" />
          <div
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#C9A961]/30 bg-[#0D0804]/70 shadow-lg shadow-black/30 transition-transform duration-300 group-hover:scale-110"
          >
            <Play className="w-9 h-9 text-[#C9A961]" />
          </div>
        </button>

        <div className="p-7">
          <p className="text-[#7A6040] text-sm tracking-wider mb-2">{liveCard.subtitle}</p>
          <h3 className="text-xl sm:text-2xl text-[#E8C87A] mb-3">{liveCard.title}</h3>
          <p className="text-[#9A7A55] text-base leading-relaxed mb-6">{liveCard.desc}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #C9A961 0%, #A8832A 100%)',
                color: '#0D0804',
              }}
            >
              <Youtube className="w-5 h-5" />
              <span>{liveCard.cta}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@alexandrerobbie?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#C9A961] transition-all hover:bg-[#C9A961]/10"
              style={{
                color: '#E8C87A',
              }}
            >
              <span>Inscrever-se no Canal</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
