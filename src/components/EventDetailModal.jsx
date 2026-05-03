import { useEffect, useState } from 'react'
import { MotionDiv } from '../utils/motion'
import ImageLightbox from './ImageLightbox'

const TYPE_COLOR = {
  'seminer': 'bg-blue-100 text-blue-700',
  'webinar': 'bg-purple-100 text-purple-700',
  'atölye': 'bg-amber-100 text-amber-700',
  'konferans': 'bg-rose-100 text-rose-700',
  'panel': 'bg-teal-100 text-teal-700',
  'gezi': 'bg-sky-100 text-sky-700',
  'sosyal sorumluluk': 'bg-green-100 text-green-700',
  'toplantı': 'bg-slate-100 text-slate-700',
  'zirve': 'bg-indigo-100 text-indigo-700',
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function EventDetailModal({ event, onClose }) {
  const [lightboxSrc, setLightboxSrc] = useState(null)

  // Single ESC handler: lightbox takes priority over modal
  useEffect(() => {
    if (!event) return
    function onKey(e) {
      if (e.key === 'Escape') {
        if (lightboxSrc) {
          setLightboxSrc(null)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [event, onClose, lightboxSrc])

  // Reset lightbox when modal closes
  useEffect(() => {
    if (!event) setLightboxSrc(null)
  }, [event])

  if (!event) return null

  const badgeClass = TYPE_COLOR[event.type] ?? 'bg-gray-100 text-gray-700'
  const parts = (event.fullDescription ?? event.description).split('\n\n')
  const metaLine = parts[0]
  const bodyParts = parts.slice(1)

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
        style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        onClick={onClose}
      >
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative bg-brand-bg border border-brand-border rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {event.image && (
            <div
              className="relative group cursor-zoom-in"
              onClick={() => setLightboxSrc(event.image)}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full max-h-64 object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-t-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-90 transition-opacity duration-200 drop-shadow"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zM11 8v6M8 11h6" />
                </svg>
              </div>
            </div>
          )}

          <div className="p-7">
            <button
              onClick={onClose}
              aria-label="Kapat"
              className="absolute top-4 right-4 text-brand-textMuted hover:text-brand-text transition-colors text-xl leading-none"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4 pr-6">
              <span className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${badgeClass}`}>
                {event.type}
              </span>
              <span className="text-xs text-brand-textMuted font-mono">
                {formatDate(event.date)}
              </span>
            </div>

            <h2 className="font-display text-xl font-bold text-brand-text leading-snug mb-5">
              {event.title}
            </h2>

            <div className="bg-brand-bgCard border border-brand-border rounded-xl px-5 py-4 mb-5">
              <p className="text-sm text-brand-textMuted leading-relaxed">
                {metaLine}
              </p>
            </div>

            {bodyParts.map((para, i) => (
              <p key={i} className="text-sm text-brand-text leading-relaxed mb-3 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </MotionDiv>
      </div>

      <ImageLightbox
        src={lightboxSrc}
        alt={event.title}
        onClose={() => setLightboxSrc(null)}
      />
    </>
  )
}
