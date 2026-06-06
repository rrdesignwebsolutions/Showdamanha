import { Calendar, Mic2, Music, Newspaper, Heart, Trophy, Star } from 'lucide-react';

const schedule = [
  {
    day: 'Segunda',
    short: 'SEG',
    theme: 'Semana com Informação',
    desc: 'Abertura da semana com as principais notícias de Itajubá e região',
    icon: Newspaper,
    color: '#C9A961',
  },
  {
    day: 'Terça',
    short: 'TER',
    theme: 'Entrevistas Especiais',
    desc: 'Personalidades, autoridades e destaques da comunidade itajubense',
    icon: Mic2,
    color: '#E8922A',
  },
  {
    day: 'Quarta',
    short: 'QUA',
    theme: 'Pedidos Musicais',
    desc: 'Sua música favorita no ar — ligue ou mande mensagem e ouça ao vivo',
    icon: Music,
    color: '#C9A961',
  },
  {
    day: 'Quinta',
    short: 'QUI',
    theme: 'Saúde & Bem-Estar',
    desc: 'Dicas de saúde, qualidade de vida e especialistas respondendo ao vivo',
    icon: Heart,
    color: '#E8922A',
  },
  {
    day: 'Sexta',
    short: 'SEX',
    theme: 'Esporte e Retrospectiva',
    desc: 'Os destaques esportivos da semana e os melhores momentos do programa',
    icon: Trophy,
    color: '#C9A961',
  },
];

export function WeeklySchedule() {
  const today = new Date().getDay(); // 0=Sun, 1=Mon...5=Fri

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
          <Calendar className="w-6 h-6 text-[#C9A961]" />
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
        </div>
        <h2 className="text-3xl sm:text-4xl text-[#C9A961] tracking-widest mb-3">
          PROGRAMAÇÃO DA SEMANA
        </h2>
        <p className="text-[#B8956A] text-lg">
          Todo dia tem um motivo pra ligar o rádio às 7h
        </p>
      </div>

      {/* Day cards — horizontal scroll on mobile */}
      <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible snap-x snap-mandatory">
        {schedule.map(({ day, short, theme, desc, icon: Icon, color }, idx) => {
          const isToday = idx + 1 === today;
          return (
            <div
              key={day}
              className="flex-shrink-0 w-64 md:w-auto snap-start rounded-2xl p-6 relative transition-transform hover:-translate-y-1"
              style={{
                background: isToday
                  ? 'linear-gradient(135deg, #2E1A06 0%, #1A0A03 100%)'
                  : '#1A0A03',
                border: isToday
                  ? '1px solid rgba(201,169,97,0.5)'
                  : '1px solid rgba(201,169,97,0.15)',
              }}
            >
              {isToday && (
                <div
                  className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs tracking-wider"
                  style={{ background: 'rgba(201,169,97,0.2)', color: '#C9A961', border: '1px solid rgba(201,169,97,0.4)' }}
                >
                  HOJE
                </div>
              )}

              {/* Day badge */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: `rgba(${isToday ? '201,169,97,0.2' : '201,169,97,0.1'})` }}
              >
                <span className="text-sm tracking-wider" style={{ color }}>{short}</span>
              </div>

              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(201,169,97,0.08)' }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>

              <p className="text-[#9A7A55] text-xs tracking-wider mb-2">{day}</p>
              <h4 className="text-[#E8C87A] mb-3 leading-snug">{theme}</h4>
              <p className="text-[#7A6040] text-sm leading-relaxed">{desc}</p>

              <div
                className="mt-4 pt-4 flex items-center gap-2"
                style={{ borderTop: '1px solid rgba(201,169,97,0.1)' }}
              >
                <Star className="w-3.5 h-3.5 text-[#C9A961]" />
                <span className="text-[#5A4030] text-xs">7h às 10h · FM 103,5</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
