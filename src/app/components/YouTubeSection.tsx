import { Youtube, ExternalLink, Play } from 'lucide-react';

export function YouTubeSection() {
  const youtubeChannelUrl = "https://youtube.com/@showdamanha";

  const cards = [
    {
      title: 'Próxima Live',
      subtitle: 'Segunda a Sexta · 7h às 10h',
      desc: 'Acompanhe o programa ao vivo no YouTube e interaja em tempo real com Alexandre Robbie.',
      cta: 'Assistir ao Vivo',
    },
    {
      title: 'Melhores Momentos',
      subtitle: 'Arquivo de vídeos',
      desc: 'Reveja as entrevistas, notícias e os destaques dos últimos programas quando quiser.',
      cta: 'Ver Vídeos',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Section header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
          <Youtube className="w-6 h-6 text-[#C9A961]" />
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
        </div>
        <h2 className="text-3xl sm:text-4xl text-[#C9A961] tracking-widest mb-3">
          LIVES NO YOUTUBE
        </h2>
        <p className="text-[#B8956A] text-lg">
          Acompanhe nossas transmissões ao vivo e não perca nenhum momento
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map(({ title, subtitle, desc, cta }) => (
          <div
            key={title}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.2)' }}
          >
            {/* Thumbnail placeholder */}
            <div
              className="aspect-video flex flex-col items-center justify-center gap-4 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #2A1205 0%, #120803 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: 'radial-gradient(ellipse at center, #C9A961 0%, transparent 70%)' }}
              />
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center z-10"
                style={{ background: 'rgba(201,169,97,0.15)', border: '2px solid rgba(201,169,97,0.3)' }}
              >
                <Play className="w-9 h-9 text-[#C9A961] ml-1" />
              </div>
              <Youtube className="w-8 h-8 text-[#C9A961]/40 z-10" />
            </div>

            {/* Info */}
            <div className="p-7">
              <p className="text-[#7A6040] text-sm tracking-wider mb-2">{subtitle}</p>
              <h3 className="text-xl sm:text-2xl text-[#E8C87A] mb-3">{title}</h3>
              <p className="text-[#9A7A55] text-base leading-relaxed mb-6">{desc}</p>
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
                <span>{cta}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Subscribe CTA */}
      <div
        className="rounded-2xl p-10 text-center"
        style={{
          background: 'linear-gradient(135deg, #2A1205 0%, #1A0A03 100%)',
          border: '1px solid rgba(201,169,97,0.2)',
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(201,169,97,0.12)' }}
        >
          <Youtube className="w-10 h-10 text-[#C9A961]" />
        </div>
        <h3 className="text-2xl sm:text-3xl text-[#C9A961] mb-3">
          Inscreva-se no Canal
        </h3>
        <p className="text-[#9A7A55] text-lg mb-8 max-w-md mx-auto">
          Ative o sininho e não perca nenhuma transmissão ao vivo do Show da Manhã
        </p>
        <a
          href={youtubeChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-xl transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #C9A961 0%, #A8832A 100%)',
            color: '#0D0804',
          }}
        >
          <Youtube className="w-6 h-6" />
          <span className="text-lg">Inscrever-se Agora</span>
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
