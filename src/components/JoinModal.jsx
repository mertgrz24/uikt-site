import { useEffect } from 'react'
import { MotionDiv } from '../utils/motion'

export default function JoinModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="relative bg-brand-bg border border-brand-border rounded-2xl shadow-xl w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapat */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 text-brand-textMuted hover:text-brand-text transition-colors text-xl leading-none"
        >
          ✕
        </button>

        {/* Başlık */}
        <p className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-2">UIKT</p>
        <h2 className="font-display text-2xl font-bold text-brand-text mb-3">
          Bize Katılın
        </h2>
        <p className="text-brand-textMuted text-sm leading-relaxed mb-6">
          Uluslararası ilişkilere ilgi duyan öğrencilerle birlikte akademik ve kariyer
          odaklı bir yolculuğa katılın.
        </p>

        {/* Bilgi kutusu */}
        <div className="bg-brand-bgCard border border-brand-border rounded-xl px-5 py-4 mb-6">
          <p className="text-brand-textMuted text-sm leading-relaxed">
            <span className="font-semibold text-brand-text">Başvuru için —</span>{' '}
            Aşağıdaki formu doldurarak başvurunuzu hızlıca tamamlayabilirsiniz.
          </p>
        </div>

        {/* Buton */}
        <a
          href="https://forms.gle/qHrWc86kqzj9caJ59"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold rounded-xl px-6 py-3 transition-colors duration-200"
        >
          Başvuru Formunu Aç
        </a>
      </MotionDiv>
    </div>
  )
}
