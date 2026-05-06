import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import EventsSection from '../components/EventsSection'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-12">
        <EventsSection />
      </main>
      <Footer />
    </div>
  )
}
