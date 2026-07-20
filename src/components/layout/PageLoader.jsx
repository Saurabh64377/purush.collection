import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion'
import Logo from '../logo/Logo'
import { BRAND } from '../../utils/constants'

const SESSION_KEY = 'puc_loaded'

export default function PageLoader() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SESSION_KEY))
  const progress = useMotionValue(0)
  const [display, setDisplay] = useState(0)
  const width = useTransform(progress, (v) => `${v}%`)

  useEffect(() => {
    if (!visible) return

    const unsub = progress.on('change', (v) => setDisplay(Math.round(v)))
    const controls = animate(progress, 100, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, '1')
        setTimeout(() => setVisible(false), 350)
      },
    })

    return () => {
      controls.stop()
      unsub()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-ink"
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <Logo size="loader" />
            <span className="text-ivory/70 text-xs uppercase tracking-luxury">{BRAND.tagline}</span>
          </motion.div>

          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-40 sm:w-56 overflow-hidden bg-ivory/10">
              <motion.div className="h-full bg-gradient-to-r from-pink-light to-pink-deep" style={{ width }} />
            </div>
            <span className="font-body text-xs tracking-luxury text-ivory/50">{display}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
