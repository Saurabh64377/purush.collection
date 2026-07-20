import { motion } from 'framer-motion'
import { PiMouseSimpleBold, PiTShirtBold, PiPantsBold, PiCoatHangerBold, PiHoodieBold, PiSneakerBold } from 'react-icons/pi'
import Logo from '../logo/Logo'
import RevealText from '../ui/RevealText'
import MagneticButton from '../ui/MagneticButton'
import StatCounter from '../ui/StatCounter'
import ImageReveal from '../ui/ImageReveal'
import DummyImage from '../ui/DummyImage'

const CHIPS = [
  { label: 'T-Shirts', icon: PiTShirtBold },
  { label: 'Jeans', icon: PiPantsBold },
  { label: 'Kurtas', icon: PiCoatHangerBold },
  { label: 'Hoodies', icon: PiHoodieBold },
  { label: 'Sneakers', icon: PiSneakerBold },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ink pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="absolute inset-0 bg-brand-radial" />

      <div className="section-container relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-10 items-center">
        <div className="flex flex-col gap-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm uppercase tracking-luxury text-pink font-medium"
          >
            {'Puपुरुष Collection'}
          </motion.span>

          <RevealText
            as="h1"
            text="Wear Confidence. Own Your Style."
            delay={0.15}
            className="max-w-2xl text-5xl sm:text-6xl lg:text-[5.2rem] font-display font-semibold leading-[1.02] text-ivory"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-md text-base sm:text-lg text-ivory/65"
          >
            Premium fashion for the new generation — crafted for young men who own their style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            <MagneticButton as="a" href="#collections" variant="solid">
              Explore Collection
            </MagneticButton>
            <MagneticButton as="a" href="#contact" variant="outline-inverse">
              Contact Us
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="grid grid-cols-3 gap-8 sm:gap-14 pt-6"
          >
            <StatCounter value={5} suffix="+" label="Years" />
            <StatCounter value={500} suffix="+" label="Styles" />
            <StatCounter value={3000} suffix="+" label="Customers" />
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <ImageReveal className="aspect-[4/5] rounded-3xl shadow-deep" panelColor="bg-charcoal">
              <DummyImage seed="../public/purush2.png" width={800} height={1000} tone="dark" eager alt="Campaign shoot" className="absolute inset-0" />
            </ImageReveal>

            <div className="absolute -bottom-6 -left-6 z-20 flex items-center gap-3 rounded-2xl bg-ink p-3 pr-5 shadow-deep ring-1 ring-ivory/10">
              <Logo size="footer" />
              <div className="text-left">
                <p className="font-display text-sm text-ivory leading-tight">पुरुष</p>
                <p className="text-[10px] uppercase tracking-wide text-ivory/50">Collection</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {CHIPS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2 text-xs uppercase tracking-wide text-ivory/70"
              >
                <Icon className="text-sm text-pink" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        data-cursor-hover
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="relative z-10 mt-16 flex flex-col items-center gap-2 text-ivory/50 mx-auto w-fit"
      >
        <PiMouseSimpleBold className="text-xl animate-pulse-glow" />
        <span className="text-[10px] uppercase tracking-luxury">Scroll</span>
      </motion.a>
    </section>
  )
}
