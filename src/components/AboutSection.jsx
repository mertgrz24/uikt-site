import { MotionDiv } from '../utils/motion'

const cards = [
  {
    title: 'Hakkımızda',
    body: 'Uluslararası İlişkiler ve Kariyer Topluluğu (UİKT), Bandırma Onyedi Eylül Üniversitesi bünyesinde faaliyet gösteren akademik ve sosyal odaklı bir öğrenci topluluğudur. Topluluğumuz; uluslararası farkındalık, kariyer geliştirme, sosyal sorumluluk ve dil becerileri gibi geniş bir yelpazede etkinlikler düzenleyerek öğrencilerin çok boyutlu gelişimine katkı sağlamayı hedeflemektedir.',
  },
  {
    title: 'Misyonumuz',
    body: 'Uluslararası ilişkiler alanında bilgi ve deneyim paylaşımını teşvik ederek, öğrencilerin kariyer hedeflerine ulaşmalarına yardımcı olmak.',
  },
  {
    title: 'Vizyonumuz',
    body: 'Küresel perspektife sahip, liderlik becerileri geliştiren ve uluslararası ilişkiler alanında etkili profesyoneller yetiştiren öncü bir topluluk olmak.',
  },
]

export default function AboutSection() {
  return (
    <section className="bg-network-pattern w-full py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <MotionDiv
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="card-glass rounded-2xl p-8"
            >
              <div className="w-10 h-0.5 bg-white/40 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">{card.title}</h3>
              <p className="text-brand-textMuted text-base leading-relaxed">{card.body}</p>
            </MotionDiv>
          ))}
        </div>

      </div>
    </section>
  )
}
