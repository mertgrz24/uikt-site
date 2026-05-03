import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function handleJoinLink(e) {
    e.preventDefault()
    setOpen(false)
    if (location.pathname === '/') {
      document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  const linkCls = 'text-xs font-mono text-brand-textMuted hover:text-brand-primary transition-colors'
  const mobileLinkCls = 'text-sm font-mono text-brand-textMuted hover:text-brand-primary transition-colors'

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-bg/90 backdrop-blur border-b border-brand-border">
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link to="/" className="font-display text-sm font-semibold text-brand-text hover:text-brand-accent transition-colors">
          IR Explorer
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/events" className={linkCls}>Faaliyetlerimiz</Link>
          <Link to="/theories" className={linkCls}>Teoriler</Link>
          <a href="#join" onClick={handleJoinLink} className={linkCls}>Bize Katılın</a>
          <Link to="/verify" className={linkCls}>Belge Doğrula</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 text-brand-textMuted hover:text-brand-text transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
        >
          <span className={`block w-5 h-px bg-current transition-transform origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-transform origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-brand-bg/95 backdrop-blur border-b border-brand-border px-6 pb-4 pt-2 flex flex-col gap-3">
          <Link to="/events" onClick={() => setOpen(false)} className={mobileLinkCls}>Faaliyetlerimiz</Link>
          <Link to="/theories" onClick={() => setOpen(false)} className={mobileLinkCls}>Teoriler</Link>
          <a href="#join" onClick={handleJoinLink} className={mobileLinkCls}>Bize Katılın</a>
          <Link to="/verify" onClick={() => setOpen(false)} className={mobileLinkCls}>Belge Doğrula</Link>
        </div>
      )}
    </nav>
  )
}
