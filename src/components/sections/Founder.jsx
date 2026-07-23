import { motion } from 'framer-motion'
import { PiQuotesBold } from 'react-icons/pi'
import ImageReveal from '../ui/ImageReveal'
import { useBrand, useSetting } from '../../context/SiteDataContext'

export default function Founder() {
  const brand = useBrand()
  const founder = useSetting('founder') || {}

  return (
    <section id="founder" className="relative bg-ink py-28 sm:py-36 overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-1/2 h-full bg-brand-radial opacity-60" />

      <div className="section-container grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <ImageReveal className="aspect-[4/5] rounded-3xl shadow-deep" panelColor="bg-ink">
            <img src={founder.image || '/founder2.jpeg'} alt="Founder" className="absolute inset-0 h-full w-full object-cover" />
          </ImageReveal>
          <div className="absolute -bottom-px inset-x-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6">
            <p className="font-display text-2xl text-ivory">{brand.founder}</p>
            <p className="text-xs uppercase tracking-luxury text-pink mt-1">Founder</p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <span className="text-xs sm:text-sm uppercase tracking-luxury text-pink font-medium">
            From the Founder
          </span>
          <PiQuotesBold className="text-4xl text-pink/60" />
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium leading-snug text-ivory"
          >
            "{founder.quote}"
          </motion.blockquote>
          <p className="text-ivory/60 leading-relaxed max-w-xl">
            {founder.description || `${brand.founder} started ${brand.name} with one goal: prove that premium style doesn't need a metro-city price tag.`}
          </p>
        </div>
      </div>
    </section>
  )
}