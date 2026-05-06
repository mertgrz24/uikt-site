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
      <section className="min-h-screen bg-brand-bgSection flex flex-col items-center justify-center overflow-hidden px-4 pt-12">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide max-w-4xl leading-tight">
            ULUSLARARASI İLİŞKİLER VE KARİYER TOPLULUĞU
          </h1>
          <div className="w-24 h-0.5 bg-brand-accentLight mt-6" />
        </div>

        {/* World map */}
        <div className="w-full max-w-6xl mx-auto">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
            alt="Dünya Haritası"
            className="w-full max-w-6xl mx-auto opacity-90"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
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
