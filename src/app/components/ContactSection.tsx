import { Phone, Instagram, MapPin } from 'lucide-react';

export function ContactSection() {
  const contactItems = [
    {
      icon: Phone,
      title: 'WhatsApp',
      value: '(35) 99131-4750',
      note: 'Envie mensagens, sugestões ou participe ao vivo!',
      href: 'https://wa.me/553591314750',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@alexandre_robbie',
      note: 'Siga nas redes e interaja com a gente!',
      href: 'https://www.instagram.com/alexandre_robbie/',
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'Rádio Panorama FM 103,5',
      note: 'Auto Estrada Bela Vista s/n, Itajubá - MG, 37502-454',
      href: 'https://google.com/maps/place/Rádio+Panorama+FM/data=!4m2!3m1!1s0x0:0xa8cd5d3532161f85?sa=X&ved=1t:2428&ictx=111',
    },
  ];

  const participateSteps = [
    'Envie mensagem via WhatsApp durante o programa',
    'Comente nas nossas lives do YouTube em tempo real',
    'Interaja nas redes sociais com #ShowDaManha',
    'Ligue para a rádio e fale ao vivo no ar',
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Contact list */}
      <div
        className="rounded-2xl p-8 sm:p-10"
        style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.2)' }}
      >
        <h3 className="text-2xl sm:text-3xl text-[#E8C87A] mb-8">Entre em Contato</h3>
        <div className="space-y-6">
          {contactItems.map(({ icon: Icon, title, value, note, href }) => (
            <a
              key={title}
              href={href}
              className="flex items-start gap-5 group rounded-xl p-4 -m-4 transition-colors hover:bg-[#C9A961]/05"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ background: 'rgba(201,169,97,0.12)', border: '1px solid rgba(201,169,97,0.2)' }}
              >
                <Icon className="w-7 h-7 text-[#C9A961]" />
              </div>
              <div>
                <h4 className="text-[#E8C87A] text-lg mb-1">{title}</h4>
                <p className="text-[#C9A961] mb-1">{value}</p>
                <p className="text-[#7A6040] text-sm">{note}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10 rounded-2xl overflow-hidden" style={{ background: '#120803', border: '1px solid rgba(201,169,97,0.2)' }}>
          <div className="aspect-[16/9] sm:aspect-[4/3]">
            <iframe
              title="Mapa da Rádio Panorama FM"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.7234818965316!2d-46.60046658500595!3d-22.42314308528495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c6dc8d24ebffe1%3A0xa8cd5d3532161f85!2sR%C3%A1dio%20Panorama%20FM!5e0!3m2!1spt-BR!2sbr!4v1719210000000"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Participate panel */}
      <div
        className="rounded-2xl p-8 sm:p-10"
        style={{ background: 'linear-gradient(135deg, #2A1205 0%, #1A0A03 100%)', border: '1px solid rgba(201,169,97,0.2)' }}
      >
        <h3 className="text-2xl sm:text-3xl text-[#E8C87A] mb-4">Participe do Programa</h3>
        <p className="text-[#9A7A55] text-lg leading-relaxed mb-8">
          Sua participação é muito importante! Envie mensagens, sugestões de pauta,
          pedidos musicais e interaja com a gente ao vivo.
        </p>

        <div
          className="rounded-xl p-6 mb-6"
          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(201,169,97,0.15)' }}
        >
          <h4 className="text-[#C9A961] text-lg mb-4">Como Participar?</h4>
          <ul className="space-y-3">
            {participateSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs mt-0.5"
                  style={{ background: 'rgba(201,169,97,0.2)', color: '#C9A961' }}
                >
                  {i + 1}
                </span>
                <span className="text-[#B8956A] text-base leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-xl p-5 text-center"
          style={{ background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)' }}
        >
          <p className="text-[#C9A961] text-lg mb-1">Segunda a Sábado · 7h45 às 11h</p>
          <p className="text-[#7A6040]">Estamos ao vivo esperando você!</p>
        </div>
      </div>
    </div>
  );
}
