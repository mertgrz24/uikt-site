import Globe3D from '../components/Globe3D'
import TheorySection from '../components/TheorySection'
import TheoryNavigator from '../components/TheoryNavigator'
import { theories } from '../data/theories'

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <section className="relative flex flex-col items-center justify-center pt-16 pb-8">
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
          <span className="font-mono text-amber-500 text-sm tracking-widest uppercase">
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
          <TheoryNavigator theories={theories} />
          {theories.map((theory) => (
            <TheorySection key={theory.id} theory={theory} />
          ))}
        </div>
      </section>
    </main>
  )
}
