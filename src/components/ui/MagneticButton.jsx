import { motion } from 'framer-motion'
import { useMagnetic } from '../../hooks/useMagnetic'

export default function MagneticButton({
  children,
  as = 'button',
  variant = 'solid',
  className = '',
  onClick,
  href,
  type = 'button',
  ...props
}) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(0.3)

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ease-luxury'

  const variants = {
    // Primary CTA — works on both light and dark sections
    solid: 'bg-pink text-ivory hover:bg-pink-deep hover:shadow-pink',
    // Secondary CTA on light/cream sections
    outline: 'border border-graphite/25 text-graphite hover:border-pink hover:text-pink',
    // Secondary CTA on dark/ink sections
    'outline-inverse': 'border border-ivory/30 text-ivory hover:border-pink hover:text-pink',
    ghost: 'text-graphite/80 hover:text-pink',
  }

  const Component = motion[as === 'a' ? 'a' : 'button']

  return (
    <Component
      ref={ref}
      href={href}
      type={as === 'a' ? undefined : type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
