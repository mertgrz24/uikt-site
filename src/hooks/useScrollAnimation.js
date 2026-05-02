import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isInView = useInView(ref, { once: isMobile, amount: 0.3, ...options })
  return { ref, isInView }
}
