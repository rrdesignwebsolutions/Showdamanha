import { Newspaper, ArrowRight, Clock } from 'lucide-react';

const news = [
  {
    date: '05 Jun 2026',
    category: 'Infraestrutura',
    title: 'Prefeitura anuncia obras de pavimentação em bairros de Itajubá',
    desc: 'Alexandre Robbie recebeu o secretário de obras ao vivo para falar sobre os investimentos previstos para 2026.',
  },
  {
    date: '04 Jun 2026',
    category: 'Saúde',
    title: 'Campanha de vacinação contra gripe bate recorde na cidade',
    desc: 'Mais de 12 mil itajubenses já se vacinaram. Postos de saúde atendem até sexta-feira sem necessidade de agendamento.',
  },
  {
    date: '03 Jun 2026',
    category: 'Esporte',
    title: 'Time local avança na Copa Regional e joga semifinal no domingo',
    desc: 'O programa levou o técnico ao estúdio para falar sobre a preparação do elenco para a decisão.',
  },
  {
    date: '02 Jun 2026',
    category: 'Economia',
    title: 'Feira de empregos reúne mais de 30 empresas em Itajubá',
    desc: 'Mais de 500 vagas disponíveis. O Show da Manhã trouxe os detalhes e o endereço do evento ao vivo.',
  },
  {
    date: '30 Mai 2026',
    category: 'Cultura',
    title: 'Festival de inverno de Itajubá confirma atrações nacionais',
    desc: 'A programação completa foi revelada com exclusividade no Show da Manhã. Confira os shows e atividades gratuitas.',
  },
  {
    date: '29 Mai 2026',
    category: 'Educação',
    title: 'UNIFEI abre 200 vagas para cursos de extensão gratuitos',
    desc: 'Inscrições abertas até o final do mês. Áreas de tecnologia, saúde e administração estão entre as opções.',
  },
];

const categoryColors: Record<string, string> = {
  Infraestrutura: '#6B9FE8',
  Saúde: '#6BD98A',
  Esporte: '#E8922A',
  Economia: '#C9A961',
  Cultura: '#E87ACF',
  Educação: '#7AC9E8',
};

export function NewsSection() {
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
          ÚLTIMAS DO PROGRAMA
        </h2>
        <p className="text-[#B8956A] text-lg">
          Os assuntos mais quentes que passaram pelo Show da Manhã
        </p>
      </div>

      {/* News grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {news.map(({ date, category, title, desc }) => {
          const catColor = categoryColors[category] || '#C9A961';
          return (
            <div
              key={title}
              className="rounded-2xl p-7 flex flex-col gap-4 transition-transform hover:-translate-y-1 cursor-default"
              style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.15)' }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-xs tracking-wider"
                  style={{ background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}40` }}
                >
                  {category}
                </span>
                <div className="flex items-center gap-1 text-[#5A4030] text-xs">
                  <Clock className="w-3 h-3" />
                  {date}
                </div>
              </div>

              <h3 className="text-[#E8C87A] leading-snug">{title}</h3>
              <p className="text-[#7A6040] text-sm leading-relaxed flex-1">{desc}</p>

              <div
                className="flex items-center gap-2 pt-4"
                style={{ borderTop: '1px solid rgba(201,169,97,0.1)' }}
              >
                <span className="text-[#5A4030] text-xs">Ouviu no Show da Manhã</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A961] ml-auto" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
