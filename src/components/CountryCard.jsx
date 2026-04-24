import { useNavigate } from 'react-router-dom'

export default function CountryCard({ country }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(`/country/${country.id}`)}
      className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-left hover:border-gray-600 hover:bg-[#1f2937] transition-all duration-200 group"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{country.flag}</span>
        <span className="font-display font-semibold text-white text-sm group-hover:text-amber-400 transition-colors">
          {country.name}
        </span>
      </div>
      <p className="text-gray-500 text-xs font-mono">{country.capital}</p>
    </button>
  )
}
