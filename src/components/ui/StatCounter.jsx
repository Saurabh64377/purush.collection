import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

export default function StatCounter({ value, suffix = '', label, inverse = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center sm:items-start gap-1"
    >
      <span className="text-3xl sm:text-4xl font-display font-semibold text-gradient-pink">
        {display}
        {suffix}
      </span>
      <span className={`text-xs sm:text-sm uppercase tracking-wide ${inverse ? 'text-ivory/60' : 'text-stone'}`}>
        {label}
      </span>
    </motion.div>
  )
}
