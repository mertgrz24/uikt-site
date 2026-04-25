import { motion } from 'framer-motion'

const cards = [
  {
    title: 'Hakkımızda',
    body: 'Uluslararası İlişkiler ve Kariyer Topluluğu, öğrencilerin akademik gelişimlerini desteklemek, kariyer hedeflerine ulaşmalarına katkı sağlamak ve küresel bakış açısı kazandırmak amacıyla kurulmuş dinamik bir öğrenci topluluğudur. Uluslararası ilişkiler, siyasi tarih ve kariyer planlaması alanlarında seminerler, webinarlar ve eğitim programları düzenleyerek üyelerine hem teorik hem de pratik bilgi sunmaktadır. Alanında uzman akademisyenler ve profesyonellerle öğrencileri bir araya getirerek sertifika destekli etkinliklerle akademik ve profesyonel gelişime katkı sağlamaktadır.',
  },
  {
    title: 'Vizyon',
    body: 'Uluslararası ilişkiler alanında bilinçli, analitik düşünebilen ve küresel gelişmeleri doğru yorumlayabilen bireyler yetiştirmek. Ulusal ve uluslararası düzeyde söz sahibi olacak genç liderlerin gelişimine katkı sağlayarak, akademik bilgi ile pratik deneyimi birleştiren, üyelerin kariyer yolculuklarında fark yaratan bir topluluk olmak.',
  },
  {
    title: 'Misyon',
    body: 'Üyelerimize uluslararası ilişkiler, siyaset bilimi ve kariyer gelişimi alanlarında nitelikli etkinlikler sunmak; seminerler, webinarlar, atölyeler ve projeler aracılığıyla bilgi paylaşımını artırmak. Alanında uzman isimlerle öğrencileri buluşturarak teorik bilgiyi uygulama ile desteklemek ve ekip çalışması, liderlik ve sosyal sorumluluk bilincini güçlendiren projeler üretmek.',
  },
]

export default function AboutSection() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="text-center mb-16">
          <span className="text-sm tracking-widest text-brand-accent uppercase font-mono">
            UIKT Hakkında
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3">
            Uluslararası İlişkiler ve Kariyer Topluluğu
          </h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="bg-[#1f2937] border border-[#374151] hover:border-brand-secondary transition-colors duration-300 rounded-2xl p-8"
            >
              <div className="w-12 h-1 bg-brand-primary mb-4 rounded-full" />
              <h3 className="text-2xl font-semibold text-white mb-4">{card.title}</h3>
              <p className="text-[#9ca3af] text-base leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
