import Globe3D from '../components/Globe3D'
import AboutSection from '../components/AboutSection'
import TheorySection from '../components/TheorySection'
import TheoryNavigator from '../components/TheoryNavigator'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { theories } from '../data/theories'

const sections = [
  { id: 'about', label: 'Hakkımızda', type: 'named' },
  { id: 'globe', label: 'Küre', type: 'named' },
  ...theories.map((t, i) => ({
    id: `theory-${i + 1}`,
    label: String(i + 1).padStart(2, '0'),
    type: 'numbered',
  })),
]

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <ScrollToTop />
      <div id="about">
        <AboutSection />
      </div>

      <section id="globe" className="relative flex flex-col items-center justify-center pt-16 pb-8">
        <div className="text-center mb-6 px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            International Relations Explorer
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            Dünya üzerindeki ülkeleri ve uluslararası ilişkiler teorilerini keşfet.
            Bir ülkeye tıkla, detaylarını gör.
          </p>
        </div>
        <Globe3D />
        <p className="text-gray-600 text-xs mt-4 font-mono">
          fareyle döndür · tıkla · yakınlaştır
        </p>
      </section>

      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-brand-accent text-sm tracking-widest uppercase">
            Kuramsal Çerçeve
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3">
            Uluslararası İlişkiler Teorileri
          </h2>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            Devletlerin, kurumların ve uluslararası sistemin nasıl işlediğini açıklayan
            10 temel teoriyi aşağı kaydırarak keşfet.
          </p>
        </div>

        <div className="relative">
          <TheoryNavigator sections={sections} />
          {theories.map((theory, index) => (
            <div key={theory.id} id={`theory-${index + 1}`}>
              <TheorySection theory={theory} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
