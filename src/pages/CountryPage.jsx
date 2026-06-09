import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCountryById } from '../data/countries'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const fadeSlide = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
}

function InfoCard({ label, value }) {
  return (
    <div className="card-glass rounded-xl p-5">
      <p className="text-xs uppercase tracking-widest text-brand-textSubtle mb-2" style={{ fontFamily: 'var(--font-body)' }}>{label}</p>
      <p className="text-xl font-semibold text-white leading-snug" style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
    </div>
  )
}

export default function CountryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const country = getCountryById(id)

  if (!country) {
    return (
      <div className="min-h-screen bg-network-pattern flex flex-col items-center justify-center gap-4">
        <p className="text-brand-textMuted font-sans text-lg">Ülke bulunamadı: <span className="font-mono text-brand-accentLight">{id}</span></p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-brand-textMuted hover:text-brand-accentLight transition-colors underline underline-offset-4"
        >
          ← Ana sayfaya dön
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-network-pattern text-brand-text">
      <ScrollToTop />
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div {...fadeSlide}>
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex items-center gap-2 text-sm text-brand-textMuted hover:text-white transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Küreye Dön
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-4">
            <span className="text-7xl leading-none select-none" role="img" aria-label={country.name}>
              {country.flag}
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {country.name}
            </h1>
          </div>

          <p
            className="text-brand-textMuted text-base leading-relaxed mb-10 max-w-2xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {country.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <InfoCard label="Başkent" value={country.capital} />
            <InfoCard label="Devlet / Hükümet Başkanı" value={country.president} />
            <InfoCard label="Nüfus" value={country.population} />
            <InfoCard label="GSYİH" value={country.gdp} />
          </div>

          <div className="card-glass rounded-xl p-5">
            <h3
              className="text-sm font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Üyesi Olduğu Kuruluşlar
            </h3>
            <div className="flex flex-wrap gap-2">
              {country.organizations.map((org) => (
                <span
                  key={org}
                  className="px-3 py-1 text-xs bg-brand-accentLight/10 text-brand-accentLight border border-brand-accentLight/20 rounded-full"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {org}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
