import { Radio, Youtube, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import logo from '../../imports/logo_show_da_manha_vetorizada_varia__o_3.png';

export function Footer() {
  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com/@showdamanha', label: 'YouTube' },
    { icon: Instagram, href: 'https://instagram.com/showdamanha', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/showdamanha', label: 'Facebook' },
    { icon: Mail, href: 'mailto:showdamanha@panoramafm.com.br', label: 'E-mail' },
    { icon: Phone, href: 'https://wa.me/5535900000000', label: 'WhatsApp' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{ background: '#080503', borderTop: '1px solid rgba(201,169,97,0.2)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div
              className="inline-block rounded-xl p-3 mb-5"
              style={{ background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.15)' }}
            >
              <img
                src={logo}
                alt="Show da Manhã"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-[#7A6040] text-base leading-relaxed">
              Informação, música e companhia para começar bem o seu dia.
            </p>
          </div>

          {/* Schedule */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Radio className="w-5 h-5 text-[#C9A961]" />
              <h4 className="text-[#C9A961] text-lg">No Ar</h4>
            </div>
            <div className="space-y-3 text-base">
              <p className="text-[#9A7A55]">Segunda a Sexta</p>
              <p className="text-[#E8C87A] text-xl">7h às 10h</p>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mt-2"
                style={{ background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.15)' }}
              >
                <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-[#C9A961]">FM 103,5 — Itajubá/MG</span>
              </div>
            </div>
          </div>

          {/* Socials & nav */}
          <div>
            <h4 className="text-[#C9A961] text-lg mb-5">Redes Sociais</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.2)' }}
                >
                  <Icon className="w-5 h-5 text-[#C9A961]" />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { id: 'home', label: 'Início' },
                { id: 'radio', label: 'Ouça ao Vivo' },
                { id: 'lives', label: 'Lives' },
                { id: 'sobre', label: 'Sobre' },
                { id: 'contato', label: 'Contato' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-[#7A6040] hover:text-[#C9A961] transition-colors text-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#4A3520]"
          style={{ borderTop: '1px solid rgba(201,169,97,0.1)' }}
        >
          <p>© 2026 Show da Manhã — Panorama FM 103,5. Todos os direitos reservados.</p>
          <p>A voz de Itajubá</p>
        </div>
      </div>
    </footer>
  );
}
