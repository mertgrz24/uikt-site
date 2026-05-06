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
    <div className="card-glass rounded-xl p-6">
      <p className="text-xs uppercase tracking-wider text-brand-textSubtle mb-2">{label}</p>
      <p className="text-xl text-white font-semibold leading-snug">{value}</p>
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
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div {...fadeSlide}>
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex items-center gap-2 text-brand-textMuted hover:text-brand-accentLight text-sm transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Küreye Dön
          </button>

          <div className="flex items-center gap-5 mb-8">
            <span className="text-7xl select-none" role="img" aria-label={country.name}>
              {country.flag}
            </span>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                {country.name.toLocaleUpperCase('tr-TR')}
              </h1>
              <p className="text-brand-textMuted mt-2 text-base leading-relaxed max-w-lg">
                {country.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <InfoCard label="Başkent" value={country.capital} />
            <InfoCard label="Devlet / Hükümet Başkanı" value={country.president} />
            <InfoCard label="Nüfus" value={country.population} />
            <InfoCard label="GSYİH" value={country.gdp} />
          </div>

          <div className="card-glass rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-white mb-4">Üyesi Olduğu Kuruluşlar</h3>
            <div className="flex flex-wrap gap-2">
              {country.organizations.map((org) => (
                <span
                  key={org}
                  className="px-3 py-1 bg-brand-accentLight/15 text-brand-accentLight border border-brand-accentLight/30 rounded-full text-sm"
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
