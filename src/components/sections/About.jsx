import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import ImageReveal from '../ui/ImageReveal'
import DummyImage from '../ui/DummyImage'
import { BRAND } from '../../utils/constants'

const PILLARS = [
  {
    number: '01',
    title: 'Mission',
    body: 'Bring premium, internationally-inspired fashion to every young man in Bridgemanganj — without the international price tag.',
  },
  {
    number: '02',
    title: 'Vision',
    body: 'Become the name UP\'s next generation trusts to define how they show up in the world.',
  },
  {
    number: '03',
    title: 'Philosophy',
    body: 'Style isn\'t bought off a shelf — it\'s built. Every piece we curate is chosen to help you own yours.',
  },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" ref={ref} className="relative bg-cream py-28 sm:py-36 overflow-hidden">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="About the Brand"
            title={`The Story of ${BRAND.name}`}
            description="Born in Bridgemanganj, built for the nation. Puपुरुष Collection started with a simple belief: young men deserve fashion that feels premium, fits perfectly, and never costs more than it should."
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-stone leading-relaxed max-w-xl"
          >
            From oversized streetwear to sharp ethnic fits for weddings and festivals, every
            collection is chosen with one question in mind — will this make him feel like the
            best version of himself? That's affordable luxury, done right.
          </motion.p>
        </div>

        <motion.div style={{ y }} className="relative">
          <ImageReveal className="aspect-[4/5] w-full rounded-3xl shadow-luxury" panelColor="bg-cream">
            <DummyImage seed="/image.png" width={800} height={1000} tone="light" alt="Shop signboard" className="absolute inset-0" />
          </ImageReveal>
        </motion.div>
      </div>

      <div className="section-container mt-24">
        {PILLARS.map(({ number, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_200px_1fr] items-baseline gap-x-6 gap-y-2 border-t border-graphite/10 py-8"
          >
            <span className="font-display text-2xl text-pink">{number}</span>
            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-graphite">{title}</h3>
            <p className="text-stone leading-relaxed sm:max-w-md col-span-2 sm:col-span-1">{body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
