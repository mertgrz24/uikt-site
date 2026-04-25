import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCountryById } from '../data/countries'
import Footer from '../components/Footer'

const fadeSlide = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
      <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">{label}</p>
      <p className="text-white text-base font-semibold leading-snug">{value}</p>
    </div>
  )
}

export default function CountryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const country = getCountryById(id)

  if (!country) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 font-sans text-lg">Ülke bulunamadı: <span className="font-mono text-brand-accent">{id}</span></p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4"
        >
          ← Ana sayfaya dön
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div {...fadeSlide}>
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors group"
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
                {country.name}
              </h1>
              <p className="text-gray-400 mt-2 text-base leading-relaxed max-w-lg">
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

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">
              Üye Olduğu Uluslararası Örgütler
            </p>
            <div className="flex flex-wrap gap-2">
              {country.organizations.map((org) => (
                <span
                  key={org}
                  className="px-3 py-1 bg-[#1f2937] text-gray-300 text-sm rounded-full border border-gray-700 font-mono"
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
