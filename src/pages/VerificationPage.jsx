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
    <div className="bg-brand-bgCard border border-brand-border rounded-xl p-5 shadow-sm">
      <p className="text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-1">{label}</p>
      <p className="text-brand-text text-base font-semibold leading-snug">{value}</p>
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
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-24 pb-16">
        <motion.div {...fadeSlide}>
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-text leading-tight mb-2">
              Belge Doğrulama
            </h1>
            <p className="text-brand-textMuted text-base leading-relaxed">
              UIKT etkinlik katılım belgenizi doğrulamak için belge numaranızı giriniz.
            </p>
          </div>

          <div className="bg-brand-bgCard border border-brand-border rounded-2xl p-6 shadow-sm mb-8">
            <label className="block text-brand-textMuted text-xs font-mono uppercase tracking-widest mb-2">
              Belge Numarası
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={belgeNo}
                onChange={(e) => setBelgeNo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Örn: UIKT-2025-001"
                className="flex-1 bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-text text-sm font-mono placeholder:text-brand-textMuted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
              />
              <button
                onClick={handleQuery}
                disabled={status === 'loading' || !belgeNo.trim()}
                className="px-5 py-3 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Sorgulanıyor…' : 'Sorgula'}
              </button>
            </div>
          </div>

          {status === 'loading' && (
            <div className="flex items-center justify-center gap-3 py-12 text-brand-textMuted">
              <span className="inline-block w-5 h-5 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
              <span className="text-sm font-mono">Kayıt aranıyor…</span>
            </div>
          )}

          {status === 'error' && (
            <motion.div
              {...fadeSlide}
              className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3"
            >
              <span className="text-red-400 text-xl leading-none mt-0.5">✕</span>
              <div>
                <p className="text-red-700 font-semibold text-sm">Kayıt Bulunamadı</p>
                <p className="text-red-600 text-sm mt-0.5">{errorMsg}</p>
              </div>
            </motion.div>
          )}

          {status === 'success' && result && (
            <motion.div {...fadeSlide}>
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-mono rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
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
