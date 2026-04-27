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
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 hidden lg:flex">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollTo(index)}
          title={section.label}
          aria-label={section.label}
          className="flex items-center justify-end p-1"
        >
          <span className={`block rounded-full transition-all duration-200 ${
            active === index
              ? 'w-3 h-3 bg-brand-accent'
              : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
          }`} />
        </button>
      ))}
    </div>
  )
}
