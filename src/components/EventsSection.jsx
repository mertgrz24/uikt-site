import { motion } from 'framer-motion'
import eventsData from '../data/events.json'

const TYPE_EMOJI = {
  'seminer': '🎓',
  'webinar': '💻',
  'atölye': '🛠️',
  'konferans': '🎤',
  'panel': '👥',
  'gezi': '✈️',
  'sosyal sorumluluk': '🤝',
  'toplantı': '📋',
  'zirve': '🏛️',
}

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

function EventCard({ event, index }) {
  const emoji = TYPE_EMOJI[event.type] ?? '📌'
  const badgeClass = TYPE_COLOR[event.type] ?? 'bg-gray-100 text-gray-700'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="bg-brand-bgCard border border-brand-border hover:border-brand-secondary hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden flex flex-col"
    >
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 flex items-center justify-center bg-brand-bg border-b border-brand-border">
          <span className="text-5xl select-none" role="img" aria-label={event.type}>
            {emoji}
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${badgeClass}`}>
            {event.type}
          </span>
          <span className="text-xs text-brand-textMuted font-mono">
            {formatDate(event.date)}
          </span>
        </div>

        <h3 className="text-base font-semibold text-brand-text leading-snug mb-3">
          {event.title}
        </h3>

        <p className="text-sm text-brand-textMuted leading-relaxed flex-1">
          {event.description}
        </p>

        <a
          href={event.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          Instagram'da Gör
        </a>
      </div>
    </motion.div>
  )
}

export default function EventsSection() {
  const sorted = [...eventsData].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <section className="w-full bg-brand-bg py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="text-center mb-16">
          <span className="text-sm tracking-widest text-brand-accent uppercase font-mono">
            Geçmiş & Güncel
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-text mt-3">
            Etkinliklerimiz
          </h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto mt-6 rounded-full" />
          <p className="text-brand-textMuted mt-6 max-w-xl mx-auto text-base">
            2022'den bugüne düzenlediğimiz seminer, atölye, konferans ve sosyal sorumluluk etkinlikleri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
