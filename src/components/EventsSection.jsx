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
  'seminer': 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  'webinar': 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
  'atölye': 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  'konferans': 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
  'panel': 'bg-teal-500/15 text-teal-300 border border-teal-500/30',
  'gezi': 'bg-sky-500/15 text-sky-300 border border-sky-500/30',
  'sosyal sorumluluk': 'bg-green-500/15 text-green-300 border border-green-500/30',
  'toplantı': 'bg-slate-500/15 text-slate-300 border border-slate-500/30',
  'zirve': 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function EventCard({ event, index, onOpen }) {
  const emoji = TYPE_EMOJI[event.type] ?? '📌'
  const badgeClass = TYPE_COLOR[event.type] ?? 'bg-white/10 text-white/70 border border-white/20'

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: false }}
      className="card-glass rounded-2xl overflow-hidden flex flex-col"
    >
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 flex items-center justify-center bg-white/5 border-b border-white/10">
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

        <h3 className="text-base font-semibold text-white leading-snug mb-3">
          {event.title}
        </h3>

        <p className="text-sm text-brand-textMuted leading-relaxed flex-1">
          {event.description}
        </p>

        <button
          onClick={() => onOpen(event)}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accentLight hover:text-white transition-colors duration-200 self-start"
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
      <section className="bg-network-pattern w-full py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide">
              FAALİYETLERİMİZ
            </h2>
            <div className="w-24 h-0.5 bg-brand-accentLight mx-auto mt-6" />
            <p className="text-brand-textMuted mt-6 max-w-xl mx-auto text-base">
              2022'den bugüne düzenlediğimiz seminer, atölye, konferans ve sosyal sorumluluk etkinlikleri.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                onOpen={setSelectedEvent}
              />
            ))}
          </div>

        </div>
      </section>

      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  )
}
