import { Menu, X, Radio, Youtube, Info, Phone, Calendar, Newspaper } from 'lucide-react';
import { useState } from 'react';
import logo from '../../imports/logo_show_da_manha_vetorizada_varia__o_3.png';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Início', icon: null },
    { id: 'radio', label: 'Ouça ao Vivo', icon: Radio },
    { id: 'programacao', label: 'Programação', icon: Calendar },
    { id: 'lives', label: 'Lives', icon: Youtube },
    { id: 'noticias', label: 'Notícias', icon: Newspaper },
    { id: 'sobre', label: 'Sobre', icon: Info },
    { id: 'contato', label: 'Contato', icon: Phone },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0804]/97 backdrop-blur-md border-b border-[#C9A961]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 focus:outline-none"
          >
            <img
              src={logo}
              alt="Show da Manhã"
              className="h-14 w-auto object-contain"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center gap-2 text-[#F5E6D3] hover:text-[#C9A961] px-4 py-2 rounded-lg hover:bg-[#C9A961]/10 transition-all"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-12 h-12 flex items-center justify-center text-[#C9A961] rounded-lg hover:bg-[#C9A961]/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0804]/98 border-t border-[#C9A961]/20 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center gap-4 text-[#F5E6D3] hover:text-[#C9A961] hover:bg-[#C9A961]/10 px-4 py-4 rounded-xl transition-all text-left"
              >
                {Icon && <Icon className="w-6 h-6 text-[#C9A961]" />}
                <span className="text-lg">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
