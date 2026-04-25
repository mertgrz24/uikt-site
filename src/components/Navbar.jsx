import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur border-b border-gray-900">
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link to="/" className="font-display text-sm font-semibold text-white hover:text-brand-accent transition-colors">
          IR Explorer
        </Link>
        <span className="text-gray-700 text-xs font-mono">v1.0</span>
      </div>
    </nav>
  )
}
