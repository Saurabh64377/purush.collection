import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../../hooks/useReducedMotion'

export default function CustomCursor() {
  const finePointer = useFinePointer()
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 30 })
  const ringY = useSpring(y, { stiffness: 300, damping: 30 })

  const cleanupRef = useRef(null)

  useEffect(() => {
    if (!finePointer) return

    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (hidden) setHidden(false)
    }

    const handleOver = (e) => {
      const interactive = e.target.closest('a, button, input, textarea, select, [data-cursor-hover]')
      setHovering(Boolean(interactive))
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseover', handleOver, { passive: true })

    cleanupRef.current = () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
    }

    return () => cleanupRef.current?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finePointer])

  if (!finePointer || hidden) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] h-2 w-2 rounded-full bg-pink mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-pink/60 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ width: hovering ? 56 : 32, height: hovering ? 56 : 32 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  )
}
