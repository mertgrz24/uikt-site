import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const API_URL =
  'https://script.google.com/macros/s/AKfycbwN3o9IBDciqRHkB31NcfefTlrXjAG2v3hC8Gdz_VeMzq4805njJhrJCGMU75vtLa1MUA/exec'

const fadeSlide = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
}

function InfoCard({ label, value }) {
  return (
    <div className="card-glass rounded-xl p-5">
      <p className="text-xs uppercase tracking-wider text-brand-textSubtle mb-2">{label}</p>
      <p className="text-white text-base font-semibold leading-snug">{value}</p>
    </div>
  )
}

export default function VerificationPage() {
  const [belgeNo, setBelgeNo] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleQuery() {
    const trimmed = belgeNo.trim()
    if (!trimmed) return

    setStatus('loading')
    setResult(null)
    setErrorMsg('')

    try {
      const res = await fetch(`${API_URL}?belgeNo=${encodeURIComponent(trimmed)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      if (data && data.found === false) {
        setStatus('error')
        setErrorMsg('Bu belge numarasına ait kayıt bulunamadı.')
      } else if (data && (data.ad || data.soyad || data.etkinlik)) {
        setResult(data)
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg('Bu belge numarasına ait kayıt bulunamadı.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Sunucuya bağlanırken bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleQuery()
  }

  return (
    <div className="min-h-screen bg-network-pattern text-brand-text flex flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-24 pb-16">
        <motion.div {...fadeSlide}>
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
              BELGE DOĞRULAMA
            </h1>
            <p className="text-brand-textMuted text-base leading-relaxed">
              UIKT etkinlik katılım belgenizi doğrulamak için belge numaranızı giriniz.
            </p>
          </div>

          <div className="card-glass rounded-2xl p-6 mb-8">
            <label className="block text-sm font-medium text-brand-textMuted mb-2">
              Belge Numarası
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={belgeNo}
                onChange={(e) => setBelgeNo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Örn: UIKT-2025-001"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono placeholder:text-brand-textSubtle focus:outline-none focus:border-brand-accentLight focus:bg-white/10 transition-colors"
              />
              <button
                onClick={handleQuery}
                disabled={status === 'loading' || !belgeNo.trim()}
                className="px-5 py-3 bg-brand-accentLight/15 hover:bg-brand-accentLight/25 text-brand-accentLight border border-brand-accentLight/30 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Sorgulanıyor…' : 'Sorgula'}
              </button>
            </div>
          </div>

          {status === 'loading' && (
            <div className="flex items-center justify-center gap-3 py-12 text-brand-textMuted">
              <span className="inline-block w-5 h-5 border-2 border-white/20 border-t-brand-accentLight rounded-full animate-spin" />
              <span className="text-sm font-mono">Kayıt aranıyor…</span>
            </div>
          )}

          {status === 'error' && (
            <motion.div
              {...fadeSlide}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 flex items-start gap-3"
            >
              <span className="text-red-300 text-xl leading-none mt-0.5">✕</span>
              <div>
                <p className="text-red-300 font-semibold text-sm">Kayıt Bulunamadı</p>
                <p className="text-red-300/80 text-sm mt-0.5">{errorMsg}</p>
              </div>
            </motion.div>
          )}

          {status === 'success' && result && (
            <motion.div {...fadeSlide}>
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Doğrulandı
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.ad && <InfoCard label="Ad" value={result.ad} />}
                {result.soyad && <InfoCard label="Soyad" value={result.soyad} />}
                {result.etkinlik && (
                  <div className="sm:col-span-2">
                    <InfoCard label="Katıldığı Etkinlik" value={result.etkinlik} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
