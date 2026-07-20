import { motion } from 'framer-motion'

/**
 * Editorial mask-reveal wrapper for photography slots: an overlay panel
 * wipes away while the content scales in slightly, revealing the image.
 * Wrap any image/placeholder with this; it only needs a sized parent.
 */
export default function ImageReveal({ children, className = '', panelColor = 'bg-ink', delay = 0 }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: 1.15, opacity: 0.6 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: delay + 0.1 }}
        style={{ transformOrigin: 'top' }}
        className={`absolute inset-0 z-10 ${panelColor}`}
      />
    </div>
  )
}
