import { useState, useEffect, useCallback } from 'react'

export default function TheoryNavigator({ sections }) {
  const [active, setActive] = useState(0)

  const scrollTo = useCallback((index) => {
    const el = document.getElementById(sections[index].id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [sections])

  useEffect(() => {
    const observers = []

    sections.forEach((section, index) => {
      const el = document.getElementById(section.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index)
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 hidden lg:flex">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollTo(index)}
          title={section.label}
          aria-label={section.label}
          className={`rounded-full transition-all duration-200 ${
            active === index
              ? 'w-2.5 h-2.5 bg-brand-accentLight shadow-lg shadow-brand-accentLight/30 scale-110'
              : 'w-2 h-2 bg-white/20 hover:bg-white/50 hover:scale-125'
          }`}
        />
      ))}
    </div>
  )
}
