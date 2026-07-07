import { Calendar, Mic2, Music, Newspaper, Heart, Trophy, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel';

const schedule = [
  {
    day: 'Abertura',
    short: 'Aba',
    theme: 'Oração do Amanhecer',
    desc: 'Começamos o dia com fé e aconchego, abrindo o Show da Manhã para a semana.',
    icon: Calendar,
    color: '#C9A961',
  },
  {
    day: 'Bom Dia',
    short: 'BOM',
    theme: 'Alô Alô Bom Dia',
    desc: 'Participação ao vivo pelo YouTube, WhatsApp e telefone logo na sequência.',
    icon: Mic2,
    color: '#E8922A',
  },
  {
    day: 'Informação',
    short: 'INF',
    theme: 'Notícias e Previsão',
    desc: 'Muita informação: tempo, horóscopo, mensagem do dia, dicas de beleza e curiosidades.',
    icon: Newspaper,
    color: '#C9A961',
  },
  {
    day: 'Vale',
    short: 'VPA',
    theme: 'Vale do Paraíba',
    desc: 'Correspondente Pepe com notícias locais e as informações das rodovias.',
    icon: Star,
    color: '#E8922A',
  },
  {
    day: 'Social',
    short: 'SOC',
    theme: 'Ouvintes ao Vivo',
    desc: 'O lado social do programa é forte, com reclamações, interação e voz do povo.',
    icon: Heart,
    color: '#C9A961',
  },
];

export function WeeklySchedule() {
  const today = new Date().getDay(); // 0=Sun, 1=Mon...5=Fri

  const renderCard = (item: any, idx: number) => {
    const { day, short, theme, desc, icon: Icon, color } = item;
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
          <span className="text-[#5A4030] text-xs">7h45 às 11h · FM 103,5</span>
        </div>
      </div>
    );
  };

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
          PROGRAMAÇÃO DO SHOW DA MANHÃ
        </h2>
        <p className="text-[#B8956A] text-lg">
          Segunda a sábado · 7h45 às 11h
        </p>
      </div>

      {/* Day cards — carousel on mobile, grid on desktop */}
      <div className="relative">
        {/* Mobile carousel */}
        <div className="md:hidden">
          <Carousel>
            <CarouselContent className="flex gap-4 pb-4 snap-x snap-mandatory">
              {schedule.map((item, idx) => (
                <CarouselItem key={item.day}>{renderCard(item, idx)}</CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-5 gap-5">
          {schedule.map((item, idx) => renderCard(item, idx))}
        </div>
      </div>
    </div>
  );
}
