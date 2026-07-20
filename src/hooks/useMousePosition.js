import { useEffect, useRef } from 'react'

// rAF-throttled mouse tracking that writes directly to CSS variables / refs,
// avoiding a React re-render on every pixel of mouse movement.
export function useMouseCssVars() {
  useEffect(() => {
    let frame = null
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    const apply = () => {
      document.documentElement.style.setProperty('--mouse-x', `${x}px`)
      document.documentElement.style.setProperty('--mouse-y', `${y}px`)
      frame = null
    }

    const handleMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}

export function useMousePositionRef() {
  const ref = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      ref.current.x = e.clientX
      ref.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return ref
}
