import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Aparecida',
    location: 'Bairro Varginha, Itajubá',
    initials: 'MA',
    text: 'Ouço o Show da Manhã todo dia antes de sair pro trabalho. O Alexandre Robbie é como um amigo da família — ele me informa, me faz rir e começa meu dia com energia. Não troco por nada!',
    stars: 5,
  },
  {
    name: 'José Antônio Ferreira',
    location: 'Santa Rita do Sapucaí, MG',
    initials: 'JA',
    text: 'Mesmo morando em Santa Rita, sintonizo toda manhã na 103,5. As entrevistas são sérias, as informações são confiáveis e o Alexandre sabe tratar qualquer assunto com respeito.',
    stars: 5,
  },
  {
    name: 'Rosângela Teixeira',
    location: 'Centro, Itajubá',
    initials: 'RT',
    text: 'Minha loja abre com o Show da Manhã ligado. Meus clientes já chegam sabendo das novidades da cidade porque ouviram aqui primeiro. É o programa mais importante do nosso rádio!',
    stars: 5,
  },
  {
    name: 'Geraldo Mendes',
    location: 'Bairro das Nações, Itajubá',
    initials: 'GM',
    text: 'Já participei ao vivo duas vezes com pedidos musicais. O Alexandre é super atencioso, dá atenção de verdade pro ouvinte. Uma honra fazer parte desse programa tão querido na cidade.',
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
          <Quote className="w-6 h-6 text-[#C9A961]" />
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
        </div>
        <h2 className="text-3xl sm:text-4xl text-[#C9A961] tracking-widest mb-3">
          QUEM OUVE, APROVA
        </h2>
        <p className="text-[#B8956A] text-lg">
          A opinião de quem faz parte do Show da Manhã todo dia
        </p>
      </div>

      {/* Testimonial grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {testimonials.map(({ name, location, initials, text, stars }) => (
          <div
            key={name}
            className="rounded-2xl p-8 flex flex-col gap-5"
            style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.18)' }}
          >
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#C9A961] fill-[#C9A961]" />
              ))}
            </div>

            {/* Quote */}
            <div className="relative">
              <Quote className="absolute -top-2 -left-1 w-6 h-6 text-[#C9A961]/20" />
              <p className="text-[#C4A882] text-base leading-relaxed pl-5 italic">
                "{text}"
              </p>
            </div>

            {/* Author */}
            <div
              className="flex items-center gap-4 pt-4"
              style={{ borderTop: '1px solid rgba(201,169,97,0.1)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,169,97,0.15)', border: '1px solid rgba(201,169,97,0.3)' }}
              >
                <span className="text-[#C9A961] text-sm">{initials}</span>
              </div>
              <div>
                <p className="text-[#E8C87A]">{name}</p>
                <p className="text-[#5A4030] text-sm">{location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <p className="text-[#7A6040] text-base">
          Você também ouve? Mande sua mensagem e apareça no programa! 📻
        </p>
      </div>
    </div>
  );
}
