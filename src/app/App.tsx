import { useRef, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RadioPlayer } from './components/RadioPlayer';
import { YouTubeSection } from './components/YouTubeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingPlayer } from './components/FloatingPlayer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { WeeklySchedule } from './components/WeeklySchedule';
import { NewsSection } from './components/NewsSection';
import { Testimonials } from './components/Testimonials';
import { Music, Users, Radio as RadioIcon, Calendar, Clock, Mic2, Sun } from 'lucide-react';
import logo from '../imports/logo_show_da_manha_vetorizada_varia__o_3.png';
import logoMicrofone from '../imports/ChatGPT_Image_1_de_jun._de_2026__16_52_06.png';
import coverImage from '../imports/Capas_facebook-1.png';

const RADIO_STREAM_URL = 'https://s33.maxcast.com.br:8192/live';

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showFloating, setShowFloating] = useState(false);

  // Initialize shared audio element once
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.crossOrigin = 'anonymous';
    audio.volume = volume / 100;
  }, []);

  // Keep audio volume in sync with state without reloading the stream
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;
  }, [volume]);

  // Show floating player after scrolling past hero
  useEffect(() => {
    const onScroll = () => {
      setShowFloating(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = volume / 100;
    audio.muted = volume === 0;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Erro ao iniciar a rádio Panorama FM', error);
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v / 100;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#0D0804', color: '#F5E6D3' }}>
      <Header />

      {/* Shared audio element */}
      <audio ref={audioRef} preload="auto" style={{ display: 'none' }}>
        <source src={RADIO_STREAM_URL} type="audio/mpeg" />
      </audio>

      <main className="pt-20">

        {/* ─── HERO ─────────────────────────────────────────── */}
        <section
          id="home"
          className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        >
          {/* Cover image background */}
          <div className="absolute inset-0">
            <img
              src={coverImage}
              alt="Show da Manhã"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay — heavier at bottom for text contrast */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(13,8,4,0.62) 0%, rgba(13,8,4,0.55) 40%, rgba(13,8,4,0.82) 80%, #0D0804 100%)',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

            {/* Logo centralizada e maior */}
            <div className="flex justify-center items-center mb-8">
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'transparent' }}>
                <img
                  src={logo}
                  alt="Show da Manhã"
                  className="w-80 sm:w-[560px] md:w-[720px] lg:w-[880px] xl:w-[1000px] h-auto mx-auto"
                  style={{ maxWidth: '95vw' }}
                />
              </div>
            </div>

            {/* Feature icons */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-14">
              {[
                { Icon: RadioIcon, label: 'Informação' },
                { Icon: Music, label: 'Música' },
                { Icon: Users, label: 'Companhia' },
                { Icon: Mic2, label: 'Comunicação' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(13,8,4,0.55)',
                      border: '1px solid rgba(201,169,97,0.35)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <Icon className="w-7 h-7 text-[#C9A961]" />
                  </div>
                  <span className="text-[#C4A882] text-sm tracking-wider" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Broadcast bar */}
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-4 rounded-2xl mx-auto"
              style={{
                background: 'rgba(13,8,4,0.6)',
                border: '1px solid rgba(201,169,97,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#C9A961]" />
                <span className="text-[#F5E6D3] text-lg">Segunda a Sábado</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-[#C9A961]/30" />
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#C9A961]" />
                <span className="text-[#F5E6D3] text-lg">7h45 às 11h</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-[#C9A961]/30" />
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-[#C9A961]" />
                <span className="text-[#F5E6D3] text-lg">FM 103,5 — Itajubá</span>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #0D0804)' }}
          />
        </section>

        {/* ─── RÁDIO AO VIVO ───────────────────────────────── */}
        <section id="radio" className="py-20" style={{ background: '#100906' }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
                <RadioIcon className="w-6 h-6 text-[#C9A961]" />
                <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
              </div>
              <h2 className="text-3xl sm:text-4xl text-[#C9A961] tracking-widest mb-3">
                OUÇA AO VIVO
              </h2>
              <p className="text-[#B8956A] text-lg">
                Sintonize agora a Panorama FM 103,5
              </p>
            </div>
            <RadioPlayer
              isPlaying={isPlaying}
              volume={volume}
              onTogglePlay={togglePlay}
              onVolumeChange={handleVolumeChange}
            />
          </div>
        </section>

        {/* ─── PROGRAMAÇÃO DA SEMANA ───────────────────────── */}
        <section id="programacao" className="py-20" style={{ background: '#0D0804' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <WeeklySchedule />
          </div>
        </section>

        {/* ─── LIVES NO YOUTUBE ────────────────────────────── */}
        <section id="lives" className="py-20" style={{ background: '#100906' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <YouTubeSection />
          </div>
        </section>

        {/* ─── ÚLTIMAS NOTÍCIAS ────────────────────────────── */}
        <section id="noticias" className="py-20" style={{ background: '#0D0804' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsSection />
          </div>
        </section>

        {/* ─── SOBRE ALEXANDRE ROBBIE ──────────────────────── */}
        <section id="sobre" className="py-20" style={{ background: '#100906' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
                <Mic2 className="w-6 h-6 text-[#C9A961]" />
                <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
              </div>
              <h2 className="text-3xl sm:text-4xl text-[#C9A961] tracking-widest mb-3">
                SOBRE ALEXANDRE ROBBIE
              </h2>
            </div>

            {/* Profile card */}
            <div
              className="rounded-2xl overflow-hidden mb-10"
              style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.2)' }}
            >
              <div className="md:flex">
                <div
                  className="md:w-2/5 flex items-center justify-center p-8"
                  style={{ background: 'linear-gradient(135deg, #2A1205 0%, #1A0A03 100%)' }}
                >
                  <img
                    src={logoMicrofone}
                    alt="Alexandre Robbie"
                    className="w-52 h-52 sm:w-64 sm:h-64 object-contain rounded-xl"
                  />
                </div>
                <div className="md:w-3/5 p-8 sm:p-10">
                  <h3 className="text-2xl sm:text-3xl text-[#E8C87A] mb-6">
                    Alexandre Robbie
                  </h3>
                  <div className="space-y-4 text-[#C4A882] text-lg leading-relaxed">
                    <p>
                      Sou Alexandre Robbie e dedico minha vida ao rádio desde 1976. Filho do inesquecível radialista José Moreira da Silva, cresci cercado pela comunicação e pelo espetáculo. Dessa história nasceu uma das maiores honras da minha vida: ser o único afilhado de Amácio Mazzaropi.

Ao longo da minha carreira, tive a oportunidade de passar por importantes emissoras, como Rede Difusora, 99 FM, RD 90 (94.7 FM), Antena 1, FM Guarujá e outras rádios do estado de São Paulo, até encontrar em Itajubá o meu lar.

Nada disso teria sido possível sem o amor e o apoio da minha mãe, Dona Didina, que aos 87 anos continua sendo minha maior inspiração e a base de toda a minha caminhada.

Há 39 anos estou no ar pela Rádio Panorama FM, onde construí uma história reconhecida com o título de Cidadão Itajubense. Este espaço é um convite para compartilhar memórias, histórias e a paixão de uma vida inteira dedicada ao rádio.

                    </p>
                    
                    <div className="pt-6" style={{ borderTop: '1px solid rgba(201,169,97,0.2)' }}>
                      <p className="text-[#C9A961] text-xl italic">
                        Acompanhe meus conteúdos, inscreva-se no canal e venha reviver comigo as memórias, curiosidades e os bastidores de mais de quatro décadas dedicadas ao rádio.
                      </p>
                      <p className="text-[#7A6040] mt-2">— Alexandre Robbie</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  Icon: RadioIcon,
                  title: 'Informação',
                  desc: 'As principais notícias de Itajubá e região com credibilidade e responsabilidade',
                },
                {
                  Icon: Music,
                  title: 'Música',
                  desc: 'A melhor seleção musical para começar o dia com energia e bom humor',
                },
                {
                  Icon: Users,
                  title: 'Companhia',
                  desc: 'Interação com os ouvintes e participação ao vivo — você faz parte do programa',
                },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl p-7 text-center"
                  style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.18)' }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'rgba(201,169,97,0.12)' }}
                  >
                    <Icon className="w-8 h-8 text-[#C9A961]" />
                  </div>
                  <h4 className="text-xl text-[#E8C87A] mb-3">{title}</h4>
                  <p className="text-[#9A7A55] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DEPOIMENTOS ─────────────────────────────────── */}
        <section id="depoimentos" className="py-20" style={{ background: '#0D0804' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Testimonials />
          </div>
        </section>

        {/* ─── CONTATO ─────────────────────────────────────── */}
        <section id="contato" className="py-20" style={{ background: '#100906' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
                <Users className="w-6 h-6 text-[#C9A961]" />
                <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,169,97,0.3)' }} />
              </div>
              <h2 className="text-3xl sm:text-4xl text-[#C9A961] tracking-widest mb-3">
                FALE COM A GENTE
              </h2>
              <p className="text-[#B8956A] text-lg">
                Participe do programa e faça parte desta história
              </p>
            </div>
            <ContactSection />
          </div>
        </section>

      </main>

      <Footer />

      {/* Floating elements */}
      <FloatingPlayer
        isPlaying={isPlaying}
        volume={volume}
        onTogglePlay={togglePlay}
        onVolumeChange={handleVolumeChange}
        visible={showFloating}
      />
      <FloatingWhatsApp />
    </div>
  );
}
