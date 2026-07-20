import { motion } from 'framer-motion'

/**
 * Word-by-word reveal (mask + translateY + opacity). Splitting by words (not
 * characters) keeps Devanagari conjuncts/matras intact.
 *
 * Uses a single parent-level whileInView observer with variant propagation
 * to children, rather than one IntersectionObserver per word — more
 * reliable (observing one large element beats N tiny inline ones) and is
 * the pattern Framer Motion recommends for staggered reveals.
 */
export default function RevealText({
  text,
  as: Tag = 'div',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.06,
  once = true,
  viewportAmount = 0.3,
}) {
  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const child = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: viewportAmount }}
        variants={container}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em]">
            <motion.span className={`inline-block will-change-transform ${wordClassName}`} variants={child}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
