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
      <section className="relative min-h-screen bg-brand-bgSection flex flex-col items-center justify-center overflow-hidden px-4 pt-12">
        {/* Corner line decorations */}
        <div className="absolute top-8 left-8 w-20 h-20 border-t border-l border-white/5 pointer-events-none" />
        <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-white/5 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b border-l border-white/5 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b border-r border-white/5 pointer-events-none" />
        {/* Extra subtle inner lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-white/5 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-white/5 pointer-events-none" />

        {/* Diamond decoration */}
        <div className="absolute bottom-12 right-12 w-16 h-16 bg-brand-accentLight/20 rotate-45 pointer-events-none" />

        {/* Title */}
        <div className="relative z-10 flex flex-col items-center text-center mb-10">
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide max-w-4xl leading-tight">
            ULUSLARARASI İLİŞKİLER VE KARİYER TOPLULUĞU
          </h1>
          <div className="w-24 h-0.5 bg-brand-accentLight mt-6" />
        </div>

        {/* World map */}
        <div className="relative z-10 w-full max-w-6xl mx-auto opacity-90">
          <img
            src="/world-map.svg"
            alt="Dünya haritası"
            className="w-full select-none"
            draggable={false}
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
