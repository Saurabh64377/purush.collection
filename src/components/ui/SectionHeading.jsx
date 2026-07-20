import { motion } from 'framer-motion'
import RevealText from './RevealText'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverse = false,
}) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  const titleColor = inverse ? 'text-ivory' : 'text-graphite'
  const descColor = inverse ? 'text-ivory/70' : 'text-stone'

  return (
    <div className={`flex flex-col gap-5 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm uppercase tracking-luxury text-pink font-medium"
        >
          {eyebrow}
        </motion.span>
      )}
      <RevealText
        as="h2"
        text={title}
        className={`text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-[1.05] ${titleColor}`}
      />
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`text-base sm:text-lg leading-relaxed ${descColor}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
