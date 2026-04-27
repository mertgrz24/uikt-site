import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] },
})

function ThinkerCard({ name, description }) {
  return (
    <div className="bg-brand-bgCard border border-brand-border rounded-lg p-4 shadow-sm">
      <p className="text-brand-text font-semibold text-sm mb-1">{name}</p>
      <p className="text-brand-textMuted text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function ComparisonTable({ rows }) {
  const headers = ['Teori', 'Ana Soru', 'Temel Aktör', 'İşbirliği Mümkün mü?']
  return (
    <div className="overflow-x-auto rounded-xl border border-brand-border mt-6 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-brand-bgCard">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 text-brand-textMuted font-mono text-xs uppercase tracking-wider border-b border-brand-border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-brand-bg' : 'bg-brand-bgSection'}>
              <td className="px-4 py-3 text-brand-primary font-semibold text-sm border-b border-brand-border">{row.theory}</td>
              <td className="px-4 py-3 text-brand-text border-b border-brand-border">{row.mainQuestion}</td>
              <td className="px-4 py-3 text-brand-text border-b border-brand-border">{row.mainActor}</td>
              <td className="px-4 py-3 border-b border-brand-border">
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold ${
                  row.cooperation === 'Evet'
                    ? 'bg-brand-primary/10 text-brand-primary'
                    : row.cooperation === 'Hayır'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-brand-bgCard text-brand-textMuted'
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
      className="min-h-screen flex items-start py-20 px-4 bg-brand-bgSection border-t border-brand-border scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <motion.div
            className="flex-shrink-0"
            {...fadeUp(0)}
          >
            <span className="font-mono text-[5rem] md:text-[7rem] font-bold text-[#cbd5e1] leading-none select-none">
              {theory.number}
            </span>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.h2
              className="font-display text-2xl md:text-3xl font-bold text-brand-text mb-4 leading-tight"
              {...fadeUp(0.05)}
            >
              {theory.title}
            </motion.h2>

            <motion.div
              className="bg-brand-primary/10 border border-brand-secondary/30 rounded-xl px-5 py-4 mb-6"
              {...fadeUp(0.1)}
            >
              <p className="text-brand-accent text-sm leading-relaxed font-medium">
                {theory.summary}
              </p>
            </motion.div>

            {theory.coreIdea && (
              <motion.div className="mb-6" {...fadeUp(0.15)}>
                <h3 className="text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-2">Temel Fikir</h3>
                <p className="text-brand-text text-sm leading-relaxed">{theory.coreIdea}</p>
              </motion.div>
            )}

            {theory.keyConcepts && theory.keyConcepts.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.2)}>
                <h3 className="text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-3">Temel Kavramlar</h3>
                <ul className="space-y-1.5">
                  {theory.keyConcepts.map((concept, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-text text-sm">
                      <span className="text-brand-accent mt-0.5 flex-shrink-0">▸</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {theory.subSchools && theory.subSchools.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.22)}>
                <h3 className="text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-3">Alt Akımlar</h3>
                <ul className="space-y-1.5">
                  {theory.subSchools.map((school, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-text text-sm">
                      <span className="text-brand-textMuted mt-0.5 flex-shrink-0">○</span>
                      <span>{school}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {theory.thinkers && theory.thinkers.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.25)}>
                <h3 className="text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-3">Önemli Düşünürler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {theory.thinkers.map((t, i) => (
                    <ThinkerCard key={i} name={t.name} description={t.description} />
                  ))}
                </div>
              </motion.div>
            )}

            {theory.relations && (
              <motion.div className="mb-6" {...fadeUp(0.3)}>
                <h3 className="text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-2">Diğer Teorilerle İlişkisi</h3>
                <p className="text-brand-text text-sm leading-relaxed">{theory.relations}</p>
              </motion.div>
            )}

            {theory.criticisms && theory.criticisms.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.32)}>
                <h3 className="text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-3">Eleştiriler</h3>
                <ul className="space-y-1.5">
                  {theory.criticisms.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-text text-sm">
                      <span className="text-red-500/70 mt-0.5 flex-shrink-0">✗</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {theory.isComparison && theory.comparisonTable && (
              <motion.div className="mb-6" {...fadeUp(0.35)}>
                <h3 className="text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-2">Karşılaştırma Tablosu</h3>
                <ComparisonTable rows={theory.comparisonTable} />
              </motion.div>
            )}

            {theory.usageGuide && theory.usageGuide.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.38)}>
                <h3 className="text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-3">Teori Seçim Rehberi</h3>
                <ul className="space-y-1.5">
                  {theory.usageGuide.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-text text-sm">
                      <span className="text-brand-secondary mt-0.5 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {theory.closingQuote && (
              <motion.blockquote
                className="mt-8 border-l-2 border-brand-secondary/40 pl-5 italic text-brand-textMuted text-sm leading-relaxed"
                {...fadeUp(0.4)}
              >
                {theory.closingQuote}
              </motion.blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
