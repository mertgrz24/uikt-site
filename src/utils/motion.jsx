import { motion } from 'framer-motion'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

function makeMobile(El) {
  return function MobileMotion({ children, className, style, initial, animate, whileInView, transition, viewport }) {
    return (
      <El
        className={className}
        style={style}
        initial={initial}
        animate={animate}
        whileInView={whileInView}
        transition={transition}
        viewport={viewport}
      >
        {children}
      </El>
    )
  }
}

export const MotionDiv = isMobile ? makeMobile(motion.div) : motion.div
export const MotionH2 = isMobile ? makeMobile(motion.h2) : motion.h2
export const MotionBlockquote = isMobile ? makeMobile(motion.blockquote) : motion.blockquote
