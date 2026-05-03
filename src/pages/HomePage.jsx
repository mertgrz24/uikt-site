import Globe3D from '../components/Globe3D'
import AboutSection from '../components/AboutSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export default function HomePage() {
  return (
    <main className="bg-brand-bg min-h-screen">
      <ScrollToTop />
      <Navbar />
      <div id="about">
        <AboutSection />
      </div>

      <section id="globe" className="relative flex flex-col items-center justify-center pt-16 pb-8 bg-brand-bg border-t border-brand-border">
        <div className="text-center mb-6 px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-3 tracking-tight">
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
