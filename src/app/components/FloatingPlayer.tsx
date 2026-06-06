import { Play, Pause, Volume2, Radio, ChevronUp } from 'lucide-react';

interface FloatingPlayerProps {
  isPlaying: boolean;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (v: number) => void;
  visible: boolean;
}

export function FloatingPlayer({ isPlaying, volume, onTogglePlay, onVolumeChange, visible }: FloatingPlayerProps) {
  const scrollToRadio = () => {
    const el = document.getElementById('radio');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        background: 'linear-gradient(90deg, #120803 0%, #1E0D05 50%, #120803 100%)',
        borderTop: '1px solid rgba(201,169,97,0.35)',
        boxShadow: '0 -4px 30px rgba(0,0,0,0.6)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* Live dot + station */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{
                background: isPlaying ? '#22C55E' : '#4A3520',
                animation: isPlaying ? 'pulse 1.5s ease-in-out infinite' : 'none',
              }}
            />
            <Radio className="w-4 h-4 text-[#C9A961] flex-shrink-0" />
          </div>
          <div className="min-w-0">
            <p className="text-[#E8C87A] text-sm truncate">Panorama FM 103,5</p>
            <p className="text-[#7A6040] text-xs hidden sm:block">A voz de Itajubá</p>
          </div>
        </div>

        {/* Play / Pause */}
        <button
          onClick={onTogglePlay}
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #C9A961 0%, #A8832A 100%)' }}
          aria-label={isPlaying ? 'Pausar' : 'Tocar'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-[#0D0804]" />
          ) : (
            <Play className="w-5 h-5 text-[#0D0804] ml-0.5" />
          )}
        </button>

        {/* Equalizer (playing state) */}
        {isPlaying && (
          <div className="hidden sm:flex items-end gap-0.5 h-5">
            {[3, 5, 4, 6, 3, 5].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-sm"
                style={{
                  height: `${h * 3}px`,
                  background: '#C9A961',
                  animation: `eqBar 0.6s ease-in-out ${i * 0.1}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}

        {/* Volume (hidden on small mobile) */}
        <div className="hidden md:flex items-center gap-2 w-32">
          <Volume2 className="w-4 h-4 text-[#C9A961] flex-shrink-0" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #C9A961 0%, #C9A961 ${volume}%, #2A1508 ${volume}%, #2A1508 100%)`,
            }}
          />
        </div>

        {/* Go to full player */}
        <button
          onClick={scrollToRadio}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs transition-colors flex-shrink-0"
          style={{ color: '#7A6040', background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.15)' }}
        >
          <ChevronUp className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Player</span>
        </button>
      </div>

      <style>{`
        @keyframes eqBar {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
