import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import TheorySection from '../components/TheorySection'
import TheoryNavigator from '../components/TheoryNavigator'
import { theories } from '../data/theories'

const sections = theories.map((t, i) => ({
  id: `theory-${i + 1}`,
  label: String(i + 1).padStart(2, '0'),
  type: 'numbered',
}))

export default function TheoriesPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-12">
        <section className="relative py-24 px-4 bg-network-pattern">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
              TEORİLER
            </h1>
            <div className="w-16 h-0.5 bg-brand-accentLight mx-auto mt-4 mb-6" />
            <p className="text-brand-textMuted mt-4 text-base leading-relaxed">
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
      </main>
      <Footer />
    </div>
  )
}
