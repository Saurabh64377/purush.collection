import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PiWhatsappLogoBold, PiArrowUpBold } from 'react-icons/pi'
import { SOCIALS } from '../../utils/constants'

const whatsapp = SOCIALS.find((s) => s.label === 'WhatsApp')

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            data-cursor-hover
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-graphite text-ivory shadow-luxury hover:bg-pink transition-colors duration-300"
          >
            <PiArrowUpBold className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {whatsapp && (
        <motion.a
          href={whatsapp.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat with us on WhatsApp"
          data-cursor-hover
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ivory shadow-luxury animate-pulse-glow"
        >
          <PiWhatsappLogoBold className="text-3xl" />
        </motion.a>
      )}
    </div>
  )
}
