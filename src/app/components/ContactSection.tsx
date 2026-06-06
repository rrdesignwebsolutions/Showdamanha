import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

export function ContactSection() {
  const contactItems = [
    {
      icon: Phone,
      title: 'WhatsApp',
      value: '(35) 9xxxx-xxxx',
      note: 'Envie mensagens, sugestões ou participe ao vivo!',
      href: 'https://wa.me/5535900000000',
    },
    {
      icon: Mail,
      title: 'E-mail',
      value: 'showdamanha@panoramafm.com.br',
      note: 'Envie suas dúvidas e sugestões',
      href: 'mailto:showdamanha@panoramafm.com.br',
    },
    {
      icon: MessageCircle,
      title: 'Redes Sociais',
      value: '@showdamanha',
      note: 'Siga nas redes e interaja com a gente!',
      href: '#',
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'Itajubá / MG',
      note: 'Panorama FM 103,5 — A voz de Itajubá',
      href: '#',
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
          <p className="text-[#C9A961] text-lg mb-1">Segunda a Sexta · 7h às 10h</p>
          <p className="text-[#7A6040]">Estamos ao vivo esperando você!</p>
        </div>
      </div>
    </div>
  );
}
