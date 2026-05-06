import { useNavigate } from 'react-router-dom'

export default function CountryCard({ country }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(`/country/${country.id}`)}
      className="card-glass rounded-xl p-4 text-left hover:bg-white/10 transition-all duration-200 group"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{country.flag}</span>
        <span className="font-display font-semibold text-white text-sm group-hover:text-brand-accentLight transition-colors">
          {country.name}
        </span>
      </div>
      <p className="text-brand-textMuted text-xs font-mono">{country.capital}</p>
    </button>
  )
}
