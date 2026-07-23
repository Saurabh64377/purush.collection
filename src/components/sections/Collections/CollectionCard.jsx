import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ImageReveal from '../../ui/ImageReveal'

const API_BASE = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:5000')

function getImageUrl(image) {
  if (!image) return ''
  // External URLs (https://...) pass through as-is
  if (image.startsWith('http')) return image
  // Uploaded files need the backend URL prefix
  return `${API_BASE}${image}`
}

export default function CollectionCard({ item, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  const imageUrl = getImageUrl(item.image)
  const displayName = item.name

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      data-cursor-hover
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-creamDim cursor-none ring-1 ring-graphite/8"
    >
      <div className="absolute inset-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={displayName}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-charcoal via-ink to-pink-deep/40 flex items-center justify-center">
            <span className="font-display text-2xl text-ivory/30">P</span>
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

      {item.tag && (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-ivory/90 px-3 py-1 text-[10px] uppercase tracking-wide text-pink-deep border border-pink/30">
          {item.tag}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-luxury">
        <h3 className="font-display text-lg font-medium text-ivory">{displayName}</h3>
        <span className="block h-px w-0 bg-pink group-hover:w-12 transition-all duration-500 ease-luxury mt-2" />
      </div>
    </motion.div>
  )
}