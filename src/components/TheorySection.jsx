import { useRef } from 'react'
import { MotionDiv, MotionH2, MotionBlockquote } from '../utils/motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] },
})

function ThinkerCard({ name, description }) {
  return (
    <div className="card-glass rounded-xl p-4">
      <p className="text-white font-medium text-sm mb-1">{name}</p>
      <p className="text-brand-textMuted text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function ComparisonTable({ rows }) {
  const headers = ['Teori', 'Ana Soru', 'Temel Aktör', 'İşbirliği Mümkün mü?']
  return (
    <div className="overflow-x-auto card-glass rounded-2xl mt-6">
      <table className="w-full text-sm">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 text-white font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-white/5">
              <td className="px-4 py-3 text-white font-medium text-sm">{row.theory}</td>
              <td className="px-4 py-3 text-brand-textMuted">{row.mainQuestion}</td>
              <td className="px-4 py-3 text-brand-textMuted">{row.mainActor}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold ${
                  row.cooperation === 'Evet'
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : row.cooperation === 'Hayır'
                    ? 'bg-red-500/10 text-red-300'
                    : 'bg-white/10 text-white/70'
                }`}>
                  {row.cooperation}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TheorySection({ theory }) {
  const sectionRef = useRef(null)

  return (
    <section
      id={`theory-${theory.id}`}
      ref={sectionRef}
      className="bg-network-pattern min-h-screen flex items-start py-20 px-4 border-t border-white/10 scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <MotionDiv
            className="flex-shrink-0"
            {...fadeUp(0)}
          >
            <span className="font-mono text-[5rem] md:text-[7rem] font-bold text-white/8 leading-none select-none">
              {theory.number}
            </span>
          </MotionDiv>

          <div className="flex-1 min-w-0">
            <MotionH2
              className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
              {...fadeUp(0.05)}
            >
              {theory.title}
            </MotionH2>

            <MotionDiv
              className="border-l-4 border-brand-accentLight bg-brand-accentLight/10 px-6 py-4 rounded-r-lg mb-6"
              {...fadeUp(0.1)}
            >
              <p className="text-brand-text italic text-sm leading-relaxed">
                {theory.summary}
              </p>
            </MotionDiv>

            {theory.coreIdea && (
              <MotionDiv className="mb-6" {...fadeUp(0.15)}>
                <h3 className="text-xl font-semibold text-brand-accentLight mt-8 mb-3">Temel Fikir</h3>
                <p className="text-brand-textMuted text-sm leading-relaxed">{theory.coreIdea}</p>
              </MotionDiv>
            )}

            {theory.keyConcepts && theory.keyConcepts.length > 0 && (
              <MotionDiv className="mb-6" {...fadeUp(0.2)}>
                <h3 className="text-xl font-semibold text-brand-accentLight mt-8 mb-3">Temel Kavramlar</h3>
                <ul className="space-y-1.5">
                  {theory.keyConcepts.map((concept, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-textMuted text-sm">
                      <span className="text-brand-accentLight mt-0.5 flex-shrink-0">▸</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            )}

            {theory.subSchools && theory.subSchools.length > 0 && (
              <MotionDiv className="mb-6" {...fadeUp(0.22)}>
                <h3 className="text-xl font-semibold text-brand-accentLight mt-8 mb-3">Alt Akımlar</h3>
                <ul className="space-y-1.5">
                  {theory.subSchools.map((school, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-textMuted text-sm">
                      <span className="text-brand-textMuted mt-0.5 flex-shrink-0">○</span>
                      <span>{school}</span>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            )}

            {theory.thinkers && theory.thinkers.length > 0 && (
              <MotionDiv className="mb-6" {...fadeUp(0.25)}>
                <h3 className="text-xl font-semibold text-brand-accentLight mt-8 mb-3">Önemli Düşünürler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {theory.thinkers.map((t, i) => (
                    <ThinkerCard key={i} name={t.name} description={t.description} />
                  ))}
                </div>
              </MotionDiv>
            )}

            {theory.relations && (
              <MotionDiv className="mb-6" {...fadeUp(0.3)}>
                <h3 className="text-xl font-semibold text-brand-accentLight mt-8 mb-3">Diğer Teorilerle İlişkisi</h3>
                <p className="text-brand-textMuted text-sm leading-relaxed">{theory.relations}</p>
              </MotionDiv>
            )}

            {theory.criticisms && theory.criticisms.length > 0 && (
              <MotionDiv className="mb-6" {...fadeUp(0.32)}>
                <h3 className="text-xl font-semibold text-brand-accentLight mt-8 mb-3">Eleştiriler</h3>
                <ul className="space-y-1.5">
                  {theory.criticisms.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-textMuted text-sm">
                      <span className="text-red-500/70 mt-0.5 flex-shrink-0">✗</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            )}

            {theory.isComparison && theory.comparisonTable && (
              <MotionDiv className="mb-6" {...fadeUp(0.35)}>
                <h3 className="text-xl font-semibold text-brand-accentLight mt-8 mb-3">Karşılaştırma Tablosu</h3>
                <ComparisonTable rows={theory.comparisonTable} />
              </MotionDiv>
            )}

            {theory.usageGuide && theory.usageGuide.length > 0 && (
              <MotionDiv className="mb-6" {...fadeUp(0.38)}>
                <h3 className="text-xl font-semibold text-brand-accentLight mt-8 mb-3">Teori Seçim Rehberi</h3>
                <ul className="space-y-1.5">
                  {theory.usageGuide.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-textMuted text-sm">
                      <span className="text-brand-accentLight mt-0.5 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            )}

            {theory.closingQuote && (
              <MotionBlockquote
                className="mt-8 border-l-2 border-brand-accentLight/40 pl-5 italic text-brand-textMuted text-sm leading-relaxed"
                {...fadeUp(0.4)}
              >
                {theory.closingQuote}
              </MotionBlockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
