import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import ImageReveal from '../ui/ImageReveal'
import { useBrand, useSetting } from '../../context/SiteDataContext'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const brand = useBrand()
  const about = useSetting('about') || {}

  const pillars = about.pillars || []

  return (
    <section id="about" ref={ref} className="relative bg-cream py-28 sm:py-36 overflow-hidden">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="About the Brand"
            title={about.heading || `The Story of ${brand.name}`}
            description={about.description}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-stone leading-relaxed max-w-xl"
          >
            {about.paragraph}
          </motion.p>
        </div>

        <motion.div style={{ y }} className="relative">
          <ImageReveal className="aspect-[4/5] w-full rounded-3xl shadow-luxury" panelColor="bg-cream">
            <img src={about.image || '/image.png'} alt="Shop" className="absolute inset-0 h-full w-full object-cover" />
          </ImageReveal>
        </motion.div>
      </div>

      <div className="section-container mt-24">
        {pillars.map(({ number, title, body }, i) => (
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