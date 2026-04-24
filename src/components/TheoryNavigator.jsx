import { useState, useEffect, useCallback } from 'react'

export default function TheoryNavigator({ theories }) {
  const [active, setActive] = useState(0)

  const scrollToTheory = useCallback((index) => {
    const el = document.getElementById(`theory-${theories[index].id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [theories])

  useEffect(() => {
    const observers = []

    theories.forEach((theory, index) => {
      const el = document.getElementById(`theory-${theory.id}`)
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
  }, [theories])

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 hidden lg:flex">
      {theories.map((theory, index) => (
        <button
          key={theory.id}
          onClick={() => scrollToTheory(index)}
          title={theory.title}
          className="group flex items-center gap-2 justify-end"
          aria-label={`${theory.number}. ${theory.title}`}
        >
          <span className={`text-xs font-mono transition-all duration-200 ${
            active === index ? 'text-amber-400 opacity-100' : 'text-transparent group-hover:text-gray-500 opacity-0 group-hover:opacity-100'
          }`}>
            {theory.number}
          </span>
          <span
            className={`block rounded-full transition-all duration-200 ${
              active === index
                ? 'w-3 h-3 bg-amber-400'
                : 'w-2 h-2 bg-gray-700 group-hover:bg-gray-500'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
