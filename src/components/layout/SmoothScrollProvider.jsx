import { useEffect } from 'react'
import { initLenis, destroyLenis } from '../../lib/lenis'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function SmoothScrollProvider({ children }) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    initLenis()
    return () => destroyLenis()
  }, [reducedMotion])

  return children
}
