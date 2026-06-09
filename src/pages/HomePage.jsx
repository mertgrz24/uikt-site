import Globe3D from '../components/Globe3D'
import AboutSection from '../components/AboutSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">
      <ScrollToTop />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen bg-brand-bgSection flex flex-col items-center justify-center overflow-hidden pt-16">

        {/* Arka plan ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-accentLight/5 rounded-full blur-3xl" />
        </div>

        {/* İçerik */}
        <div className="relative z-10 w-full flex flex-col items-center px-4">

          {/* Üst etiket — çok küçük ekranda gizle */}
          <div className="hidden sm:flex items-center gap-2 mb-6">
            <div className="w-6 h-px bg-brand-accentLight/50" />
            <span
              className="text-xs font-medium text-brand-accentLight/70 tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Bandırma Onyedi Eylül Üniversitesi
            </span>
            <div className="w-6 h-px bg-brand-accentLight/50" />
          </div>

          {/* Ana başlık */}
          <h1
            className="text-gradient text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4 max-w-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Uluslararası İlişkiler ve Kariyer Topluluğu
          </h1>

          {/* Alt metin */}
          <p
            className="text-brand-textMuted text-sm md:text-base text-center mb-10 max-w-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Küresel perspektif, akademik derinlik, kariyer vizyonu.
          </p>

          {/* Dünya haritası */}
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
              alt="Dünya Haritası"
              className="w-full h-auto object-contain opacity-80"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>
      </section>

      <div id="about">
        <AboutSection />
      </div>

      <section id="globe" className="relative flex flex-col items-center justify-center pt-16 pb-8 bg-brand-bg border-t border-white/10">
        <div className="text-center mb-6 px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            ULUSLARARASI İLİŞKİLER GEZGİNİ
          </h1>
          <p className="text-brand-textMuted text-base md:text-lg max-w-xl mx-auto">
            Dünya üzerindeki ülkeleri ve uluslararası ilişkiler teorilerini keşfet.
            Bir ülkeye tıkla, detaylarını gör.
          </p>
        </div>
        <Globe3D />
        <p className="hidden md:block text-brand-textMuted text-xs mt-4 font-mono">
          fareyle döndür · tıkla · yakınlaştır
        </p>
      </section>

      <Footer />
    </main>
  )
}
