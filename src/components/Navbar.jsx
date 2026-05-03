import { useState } from 'react'
import { Link } from 'react-router-dom'
import JoinModal from './JoinModal'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)

  const linkCls = 'text-xs font-mono text-brand-textMuted hover:text-brand-primary transition-colors'
  const mobileLinkCls = 'text-sm font-mono text-brand-textMuted hover:text-brand-primary transition-colors'

  function openJoin() {
    setMenuOpen(false)
    setJoinOpen(true)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-bg/90 backdrop-blur border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link to="/" className="font-display text-sm font-semibold text-brand-text hover:text-brand-accent transition-colors">
            IR Explorer
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/" className={linkCls}>Ana Sayfa</Link>
            <Link to="/events" className={linkCls}>Faaliyetlerimiz</Link>
            <Link to="/theories" className={linkCls}>Teoriler</Link>
            <button onClick={openJoin} className={linkCls}>Bize Katılın</button>
            <Link to="/verify" className={linkCls}>Belge Doğrula</Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 text-brand-textMuted hover:text-brand-text transition-colors"
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
          <div className="md:hidden bg-brand-bg/95 backdrop-blur border-b border-brand-border px-6 pb-4 pt-2 flex flex-col gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className={mobileLinkCls}>Ana Sayfa</Link>
            <Link to="/events" onClick={() => setMenuOpen(false)} className={mobileLinkCls}>Faaliyetlerimiz</Link>
            <Link to="/theories" onClick={() => setMenuOpen(false)} className={mobileLinkCls}>Teoriler</Link>
            <button onClick={openJoin} className={`${mobileLinkCls} text-left`}>Bize Katılın</button>
            <Link to="/verify" onClick={() => setMenuOpen(false)} className={mobileLinkCls}>Belge Doğrula</Link>
          </div>
        )}
      </nav>

      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  )
}
