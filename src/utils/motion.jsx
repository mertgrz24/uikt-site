import { motion } from 'framer-motion'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

export const MotionDiv = isMobile
  ? ({ children, className, style }) => <div className={className} style={style}>{children}</div>
  : motion.div

export const MotionH2 = isMobile
  ? ({ children, className }) => <h2 className={className}>{children}</h2>
  : motion.h2

export const MotionBlockquote = isMobile
  ? ({ children, className }) => <blockquote className={className}>{children}</blockquote>
  : motion.blockquote
