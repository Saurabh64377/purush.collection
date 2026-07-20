import { motion } from 'framer-motion'
import { PiQuotesBold } from 'react-icons/pi'
import ImageReveal from '../ui/ImageReveal'
import DummyImage from '../ui/DummyImage'
import { BRAND } from '../../utils/constants'

export default function Founder() {
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
            <DummyImage seed="/founder2.jpeg" width={800} height={1000} tone="dark" alt="Founder portrait" className="absolute inset-0" />
          </ImageReveal>
          <div className="absolute -bottom-px inset-x-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6">
            <p className="font-display text-2xl text-ivory">{BRAND.founder}</p>
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
            "Fashion isn't about following trends — it's about knowing exactly who you are, and
            dressing like it. That's what we build for every young man who walks through our
            doors."
          </motion.blockquote>
          <p className="text-ivory/60 leading-relaxed max-w-xl">
            {BRAND.founder} started {BRAND.name} with one goal: prove that premium style doesn't
            need a metro-city price tag. Every collection, every fit, every fabric choice comes
            from that same conviction — Bridgemanganj deserves fashion this good.
          </p>
        </div>
      </div>
    </section>
  )
}
