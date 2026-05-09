import { lazy, Suspense, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { countries } from '../data/countries'

const GlobeDesktop = lazy(() => import('./GlobeDesktop'))

export default function Globe3D() {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return (
      <div className="w-full px-4 py-6">
        <p className="text-brand-textMuted text-xs font-mono uppercase tracking-widest text-center mb-4">
          Ülke Seçin
        </p>
        <div className="grid grid-cols-2 gap-2">
          {countries.map((country) => (
            <button
              key={country.id}
              onClick={() => navigate(`/country/${country.id}`)}
              className="bg-white/5 border border-white/10 rounded-lg p-3 text-white hover:bg-white/10 flex items-center gap-2 text-left transition-colors duration-200"
            >
              <span className="text-xl leading-none">{country.flag}</span>
              <span className="text-white text-sm font-medium leading-snug truncate">
                {country.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-brand-textMuted font-sans animate-pulse">Küre yükleniyor…</p>
      </div>
    }>
      <GlobeDesktop />
    </Suspense>
  )
}
