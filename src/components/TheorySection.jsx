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
    <div className="bg-[#1f2937] border border-gray-700 rounded-lg p-4">
      <p className="text-white font-semibold text-sm mb-1">{name}</p>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function ComparisonTable({ rows }) {
  const headers = ['Teori', 'Ana Soru', 'Temel Aktör', 'İşbirliği Mümkün mü?']
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 mt-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#1f2937]">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 text-gray-400 font-mono text-xs uppercase tracking-wider border-b border-gray-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-[#111827]' : 'bg-[#0f172a]'}>
              <td className="px-4 py-3 text-amber-400 font-semibold text-sm border-b border-gray-800">{row.theory}</td>
              <td className="px-4 py-3 text-gray-300 border-b border-gray-800">{row.mainQuestion}</td>
              <td className="px-4 py-3 text-gray-300 border-b border-gray-800">{row.mainActor}</td>
              <td className="px-4 py-3 border-b border-gray-800">
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold ${
                  row.cooperation === 'Evet'
                    ? 'bg-emerald-900/50 text-emerald-400'
                    : row.cooperation === 'Hayır'
                    ? 'bg-red-900/50 text-red-400'
                    : 'bg-gray-800 text-gray-400'
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
      className="min-h-screen flex items-start py-20 px-4 border-t border-gray-900 scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <motion.div
            className="flex-shrink-0"
            {...fadeUp(0)}
          >
            <span className="font-mono text-[5rem] md:text-[7rem] font-bold text-gray-800 leading-none select-none">
              {theory.number}
            </span>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.h2
              className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
              {...fadeUp(0.05)}
            >
              {theory.title}
            </motion.h2>

            <motion.div
              className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-4 mb-6"
              {...fadeUp(0.1)}
            >
              <p className="text-amber-200 text-sm leading-relaxed font-medium">
                {theory.summary}
              </p>
            </motion.div>

            {theory.coreIdea && (
              <motion.div className="mb-6" {...fadeUp(0.15)}>
                <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-2">Temel Fikir</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{theory.coreIdea}</p>
              </motion.div>
            )}

            {theory.keyConcepts && theory.keyConcepts.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.2)}>
                <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">Temel Kavramlar</h3>
                <ul className="space-y-1.5">
                  {theory.keyConcepts.map((concept, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {theory.subSchools && theory.subSchools.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.22)}>
                <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">Alt Akımlar</h3>
                <ul className="space-y-1.5">
                  {theory.subSchools.map((school, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">○</span>
                      <span>{school}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {theory.thinkers && theory.thinkers.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.25)}>
                <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">Önemli Düşünürler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {theory.thinkers.map((t, i) => (
                    <ThinkerCard key={i} name={t.name} description={t.description} />
                  ))}
                </div>
              </motion.div>
            )}

            {theory.relations && (
              <motion.div className="mb-6" {...fadeUp(0.3)}>
                <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-2">Diğer Teorilerle İlişkisi</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{theory.relations}</p>
              </motion.div>
            )}

            {theory.criticisms && theory.criticisms.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.32)}>
                <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">Eleştiriler</h3>
                <ul className="space-y-1.5">
                  {theory.criticisms.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-red-500/70 mt-0.5 flex-shrink-0">✗</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {theory.isComparison && theory.comparisonTable && (
              <motion.div className="mb-6" {...fadeUp(0.35)}>
                <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-2">Karşılaştırma Tablosu</h3>
                <ComparisonTable rows={theory.comparisonTable} />
              </motion.div>
            )}

            {theory.usageGuide && theory.usageGuide.length > 0 && (
              <motion.div className="mb-6" {...fadeUp(0.38)}>
                <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">Teori Seçim Rehberi</h3>
                <ul className="space-y-1.5">
                  {theory.usageGuide.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {theory.closingQuote && (
              <motion.blockquote
                className="mt-8 border-l-2 border-amber-500/40 pl-5 italic text-gray-400 text-sm leading-relaxed"
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
