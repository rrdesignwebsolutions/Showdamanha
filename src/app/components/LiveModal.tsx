import { X } from 'lucide-react';

interface LiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
  loading: boolean;
}

function isLiveSchedule() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  return day >= 1 && day <= 6 && hour >= 7 && hour < 11;
}

function getEmbedHostUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return 'https://showdamanha.com';
}

export function LiveModal({ isOpen, onClose, videoId, loading }: LiveModalProps) {
  const liveOpen = isLiveSchedule();
  const embedHostUrl = getEmbedHostUrl();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/90 p-4 pt-8 md:items-center">
      <div className="w-full max-w-[95vw] max-h-[95vh] overflow-hidden rounded-[28px] border border-[#C9A961]/20 bg-[#0D0804] shadow-[0_0_80px_rgba(0,0,0,0.45)]">
        <div className="flex flex-col gap-3 border-b border-[#C9A961]/20 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#C9A961]">Show da Manhã</h2>
            <p className="text-sm text-[#B8956A]">Live do dia com chat ao vivo</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#C9A961]/20 bg-[#120803] p-2 text-[#E8C87A] transition hover:bg-[#C9A961]/15 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex min-h-[70vh] flex-col gap-4 bg-[#120803] p-4 md:flex-row md:p-5">
          <div className="flex-1 overflow-hidden rounded-[28px] border border-[#C9A961]/20 bg-black">
            {loading ? (
              <div className="flex h-full min-h-[420px] items-center justify-center p-6 text-[#B8956A]">
                Carregando vídeo...
              </div>
            ) : videoId ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Live do Show da Manhã"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-[#B8956A]">
                Não foi possível carregar o vídeo.
              </div>
            )}
          </div>

          <div className="h-full w-full max-w-[430px] overflow-hidden rounded-[28px] border border-[#C9A961]/20 bg-[#1A0A03] md:w-[430px]">
            {videoId ? (
              liveOpen ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/live_chat?v=${videoId}&embed_host_url=${encodeURIComponent(embedHostUrl)}`}
                  title="Chat do YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-6">
                  <div>
                    <p className="mb-4 text-lg font-semibold text-[#E8C87A]">Comentários do vídeo</p>
                    <p className="mb-6 text-sm leading-6 text-[#B8956A]">
                      O chat ao vivo só aparece durante a live, das 7h45 às 11h de segunda a sábado.
                      Fora desse horário, abra os comentários no YouTube para ler a conversa do público.
                    </p>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[#C9A961] px-4 py-3 text-sm font-semibold text-[#0D0804] transition hover:bg-[#d8c279]"
                  >
                    Abrir comentários no YouTube
                  </a>
                </div>
              )
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-sm text-[#B8956A]">
                Comentários disponíveis quando o vídeo estiver carregado.
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-[#C9A961]/20 bg-[#120803] p-4 text-sm text-[#B8956A]">
          <p>Se estiver dentro do horário de segunda a sábado, das 7h45 às 11h, o vídeo exibido será a live do dia.</p>
          <p className="mt-2">Fora desse horário, o player mostra o último vídeo publicado no canal.</p>
        </div>
      </div>
    </div>
  );
}
