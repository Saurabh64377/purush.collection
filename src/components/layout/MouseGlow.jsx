import { useMouseCssVars } from '../../hooks/useMousePosition'
import { useFinePointer } from '../../hooks/useReducedMotion'

export default function MouseGlow() {
  const finePointer = useFinePointer()
  useMouseCssVars()

  if (!finePointer) return null
  return <div className="mouse-glow" />
}
