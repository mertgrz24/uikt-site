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
    <section className="bg-network-pattern w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Başlık bloğu */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-medium text-brand-accentLight/60 tracking-[0.2em] uppercase mb-4 block"
          >
            Hakkımızda
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Uluslararası İlişkiler ve Kariyer Topluluğu
          </h2>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch">
          {cards.map((card, i) => (
            <MotionDiv
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="card-glass rounded-2xl p-6 md:p-7 flex flex-col gap-4"
            >
              {/* İkon */}
              <div className="w-8 h-8 rounded-lg bg-brand-accentLight/10 border border-brand-accentLight/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-brand-accentLight/60" />
              </div>
              <h3
                className="text-lg font-semibold text-white"
              >
                {card.title}
              </h3>
              <p
                className="text-brand-textMuted text-sm leading-relaxed flex-1"
              >
                {card.body}
              </p>
            </MotionDiv>
          ))}
        </div>

      </div>
    </section>
  )
}
