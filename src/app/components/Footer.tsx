import { useEffect, useState } from 'react';
import { Radio, Youtube, Instagram, Facebook, Phone } from 'lucide-react';
import logo from '../../imports/logo_show_da_manha_vetorizada_varia__o_3.png';

function SponsorImage({
  sources,
  alt,
  className,
  fallbackClassName,
}: {
  sources: string[];
  alt: string;
  className?: string;
  fallbackClassName?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [sources]);

  if (currentIndex >= sources.length) {
    return (
      <div className={fallbackClassName ?? 'flex h-full w-full items-center justify-center text-center text-xs text-[#7A6040]'}>
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={sources[currentIndex]}
      alt={alt}
      className={className}
      onError={() => setCurrentIndex((prev) => prev + 1)}
      loading="lazy"
    />
  );
}

export function Footer() {
  const sponsors = Array.from({ length: 24 }, (_, index) => ({
    name: `patrocinador-${index + 1}`,
    alt: `Patrocinador ${index + 1}`,
  }));

  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);

  const getSponsorImageSources = (name: string) => [
    `/sponsors/${name}.png`,
    `/sponsors/${name}.jpg`,
    `/sponsors/${name}.jpeg`,
    `/sponsors/${name}.webp`,
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSponsorIndex((prev) => (prev + 1) % sponsors.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [sponsors.length]);

  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@alexandrerobbie', label: 'YouTube' },
    { icon: Instagram, href: 'https://www.instagram.com/alexandre_robbie/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/AlexandreRobbieShowDaManha', label: 'Facebook' },
    { icon: Phone, href: 'https://wa.me/553591314750', label: 'WhatsApp' },
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
              <p className="text-[#9A7A55]">Segunda a Sábado</p>
              <p className="text-[#E8C87A] text-xl">7:45h às 11h</p>
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

        <div className="mb-10 flex justify-center">
          <div className="w-full sm:max-w-sm">
            <h4 className="text-[#C9A961] text-lg mb-5 text-center">Patrocinadores</h4>
            <div className="flex min-h-[192px] items-center justify-center rounded-[28px] border border-[#C9A961]/20 bg-[#120803] p-6 transition-all duration-500">
              <SponsorImage
                key={sponsors[currentSponsorIndex].name}
                sources={getSponsorImageSources(sponsors[currentSponsorIndex].name)}
                alt={sponsors[currentSponsorIndex].alt}
                className="max-h-40 max-w-full object-contain transition-opacity duration-500"
                fallbackClassName="flex h-full w-full items-center justify-center text-center text-sm text-[#7A6040]"
              />
            </div>
            
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#4A3520]"
          style={{ borderTop: '1px solid rgba(201,169,97,0.1)' }}
        >
          <p>© 2026 Show da Manhã com Alexandre Robbie. Todos os direitos reservados.</p>
          <p>A voz de Itajubá</p>
        </div>
      </div>
    </footer>
  );
}
