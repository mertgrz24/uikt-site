import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3, ...options })
  return { ref, isInView }
}
