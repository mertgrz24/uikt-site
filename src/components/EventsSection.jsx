import { useState } from 'react'
import { MotionDiv } from '../utils/motion'
import eventsData from '../data/events.json'
import EventDetailModal from './EventDetailModal'

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

function EventCard({ event, index, onOpen }) {
  const emoji = TYPE_EMOJI[event.type] ?? '📌'
  const badgeClass = TYPE_COLOR[event.type] ?? 'bg-gray-100 text-gray-700'

  return (
    <MotionDiv
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

        <button
          onClick={() => onOpen(event)}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors duration-200 self-start"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
          </svg>
          Detaylar
        </button>
      </div>
    </MotionDiv>
  )
}

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const sorted = [...eventsData].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <section className="w-full bg-brand-bg py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary">
              FAALİYETLERİMİZ
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mt-6 rounded-full" />
            <p className="text-brand-textMuted mt-6 max-w-xl mx-auto text-base">
              2022'den bugüne düzenlediğimiz seminer, atölye, konferans ve sosyal sorumluluk etkinlikleri.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} onOpen={setSelectedEvent} />
            ))}
          </div>

        </div>
      </section>

      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  )
}
