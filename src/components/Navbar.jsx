import { useState } from 'react'
import { Link } from 'react-router-dom'
import JoinModal from './JoinModal'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)

  const linkCls = 'text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide'
  const mobileLinkCls = 'text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide'

  function openJoin() {
    setMenuOpen(false)
    setJoinOpen(true)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/70 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/uikt-logo.jpeg" alt="UİKT" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={openJoin}
              className="px-4 py-2 text-sm font-medium bg-brand-accentLight/10 hover:bg-brand-accentLight/20 text-brand-accentLight border border-brand-accentLight/25 rounded-full transition-all duration-200"
            >
              Bize Katılın
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 text-white/60 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
          >
            <span className={`block w-5 h-px bg-current transition-transform origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-transform origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-brand-bg/95 backdrop-blur-xl border-t border-white/10 px-6 pb-5 pt-3 flex flex-col gap-3">
            <button
              onClick={openJoin}
              className="w-full text-center py-3 text-sm font-medium bg-brand-accentLight/10 hover:bg-brand-accentLight/20 text-brand-accentLight border border-brand-accentLight/25 rounded-full transition-all duration-200"
            >
              Bize Katılın
            </button>
          </div>
        )}
      </nav>

      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  )
}
