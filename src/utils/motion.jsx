const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

let MotionDiv, MotionH2, MotionBlockquote

if (isMobile) {
  MotionDiv = ({ children, className, style }) => <div className={className} style={style}>{children}</div>
  MotionH2 = ({ children, className }) => <h2 className={className}>{children}</h2>
  MotionBlockquote = ({ children, className }) => <blockquote className={className}>{children}</blockquote>
} else {
  const { motion } = await import('framer-motion')
  MotionDiv = motion.div
  MotionH2 = motion.h2
  MotionBlockquote = motion.blockquote
}

export { MotionDiv, MotionH2, MotionBlockquote }
