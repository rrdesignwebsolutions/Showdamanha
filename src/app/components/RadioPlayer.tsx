import { Radio, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';

interface RadioPlayerProps {
  isPlaying: boolean;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (v: number) => void;
}

export function RadioPlayer({ isPlaying, volume, onTogglePlay, onVolumeChange }: RadioPlayerProps) {
  const [muted, setMuted] = useState(false);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setMuted(v === 0);
    onVolumeChange(v);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    onVolumeChange(next ? 0 : volume || 80);
  };

  const displayVolume = muted ? 0 : volume;

  return (
    <div
      className="rounded-2xl p-8 sm:p-10"
      style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.25)' }}
    >
      <div className="flex flex-col items-center gap-8">

        {/* Station info */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Radio className="w-7 h-7 text-[#C9A961]" />
            <h3 className="text-2xl sm:text-3xl text-[#C9A961] tracking-widest">
              PANORAMA FM 103,5
            </h3>
          </div>
          <p className="text-[#9A7A55] text-lg">A Primeira do Seu Rádio</p>
        </div>

        {/* Play button */}
        <div className="relative">
          {isPlaying && (
            <div
              className="absolute inset-0 -m-3 rounded-full animate-ping opacity-20"
              style={{ background: '#C9A961' }}
            />
          )}
          <button
            onClick={onTogglePlay}
            className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #C9A961 0%, #A8832A 100%)' }}
            aria-label={isPlaying ? 'Pausar' : 'Tocar rádio ao vivo'}
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 text-[#0D0804]" />
            ) : (
              <Play className="w-10 h-10 text-[#0D0804] ml-1" />
            )}
          </button>
        </div>

        {/* Live indicator */}
        <div
          className="flex items-center gap-3 px-5 py-2 rounded-full"
          style={{
            background: isPlaying ? 'rgba(201,169,97,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isPlaying ? 'rgba(201,169,97,0.4)' : 'rgba(255,255,255,0.08)'}`,
            transition: 'all 0.3s',
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: isPlaying ? '#22C55E' : '#4A3520',
              animation: isPlaying ? 'pulse 1.5s ease-in-out infinite' : 'none',
            }}
          />
          <span
            className="text-sm tracking-widest"
            style={{ color: isPlaying ? '#C9A961' : '#6B5D4F' }}
          >
            {isPlaying ? 'AO VIVO' : 'CLIQUE PARA OUVIR'}
          </span>

          {isPlaying && (
            <div className="flex items-end gap-0.5 h-5">
              {[3, 5, 4, 6, 3, 5, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-sm"
                  style={{
                    height: `${h * 3}px`,
                    background: '#C9A961',
                    animation: `eqBar 0.6s ease-in-out ${i * 0.08}s infinite alternate`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Volume */}
        <div className="flex items-center gap-4 w-full max-w-sm">
          <button onClick={toggleMute} className="text-[#C9A961] hover:text-[#E8C87A] transition-colors">
            {muted || displayVolume === 0 ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={displayVolume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #C9A961 0%, #C9A961 ${displayVolume}%, #2A1508 ${displayVolume}%, #2A1508 100%)`,
            }}
          />
          <span className="text-[#9A7A55] text-base w-12 text-right">{displayVolume}%</span>
        </div>

        <p className="text-[#6B5D4F] text-sm text-center">
          Transmissão ao vivo
        </p>
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
