import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export function FloatingWhatsApp() {
  const [expanded, setExpanded] = useState(false);
  const whatsappNumber = '5535900000000';
  const message = encodeURIComponent('Olá! Quero participar do Show da Manhã com Alexandre Robbie!');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3">
      {/* Popup bubble */}
      {expanded && (
        <div
          className="rounded-2xl p-5 w-72 shadow-2xl"
          style={{ background: '#1A0A03', border: '1px solid rgba(201,169,97,0.25)' }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[#E8C87A] mb-0.5">Fale conosco!</p>
              <p className="text-[#7A6040] text-sm">Geralmente respondemos em minutos</p>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-[#7A6040] hover:text-[#C9A961] transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div
            className="rounded-xl p-3 mb-4"
            style={{ background: 'rgba(201,169,97,0.07)', border: '1px solid rgba(201,169,97,0.15)' }}
          >
            <p className="text-[#C9A961] text-sm">
              📻 Participe do Show da Manhã
            </p>
            <p className="text-[#9A7A55] text-xs mt-1">
              Envie mensagens, pedidos musicais, sugestões de pauta e interaja ao vivo!
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl transition-all hover:opacity-90"
            style={{ background: '#25D366', color: '#fff' }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Abrir WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 relative"
        style={{ background: '#25D366' }}
        aria-label="WhatsApp"
      >
        {/* Ping ring */}
        {!expanded && (
          <span
            className="absolute inset-0 rounded-full opacity-40 animate-ping"
            style={{ background: '#25D366' }}
          />
        )}
        {expanded ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
      </button>
    </div>
  );
}
