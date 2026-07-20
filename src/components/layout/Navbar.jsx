import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PiListBold, PiXBold } from 'react-icons/pi'
import Logo from '../logo/Logo'
import MagneticButton from '../ui/MagneticButton'
import { NAV_LINKS, BRAND } from '../../utils/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const textColor = scrolled ? 'text-graphite/75 hover:text-pink' : 'text-ivory/85 hover:text-pink'

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-luxury ${
          scrolled ? 'py-3 bg-cream/90 backdrop-blur-md border-b border-graphite/8 shadow-luxury' : 'py-6 bg-transparent'
        }`}
      >
        <nav className="section-container flex items-center justify-between">
          <a href="#home" className="relative z-10 flex items-center gap-3" aria-label={`${BRAND.name} — home`} data-cursor-hover>
            <Logo size="nav" />
            <span
              className={`hidden sm:block font-display text-sm uppercase tracking-wide transition-colors duration-500 ${
                scrolled ? 'text-graphite' : 'text-ivory'
              }`}
            >
              {BRAND.short}
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor-hover
                  className={`text-sm uppercase tracking-wide transition-colors duration-300 ${textColor}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <MagneticButton
              as="a"
              href="#contact"
              variant={scrolled ? 'outline' : 'outline-inverse'}
              className="!px-6 !py-3 text-xs"
            >
              Contact Us
            </MagneticButton>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            data-cursor-hover
            className={`lg:hidden relative z-10 text-2xl p-2 transition-colors duration-300 ${
              scrolled ? 'text-graphite' : 'text-ivory'
            }`}
          >
            {menuOpen ? <PiXBold /> : <PiListBold />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                className="text-3xl font-display text-ivory hover:text-pink transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + NAV_LINKS.length * 0.07, duration: 0.5 }}
              className="mt-4 rounded-full bg-pink text-ivory px-8 py-3 text-sm uppercase tracking-wide"
            >
              Contact Us
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
