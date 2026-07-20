const GRADIENTS = [
  'from-charcoal via-ink to-pink-deep/40',
  'from-ink via-charcoal to-pink/25',
  'from-pink-deep/30 via-ink to-charcoal',
  'from-charcoal via-pink-deep/20 to-ink',
]

/**
 * Category-accurate placeholder: the product's own icon, large and lit,
 * instead of an unrelated stock photo. A random photo (a flower for
 * "Baggy Jeans", a mountain for "Hoodies") actively misrepresents the
 * product — this never does, and reads as an intentional branded tile
 * rather than a broken image. Swap for real product photography later;
 * layout/sizing stays identical.
 */
export default function CategoryArt({ icon: Icon, index = 0, className = '' }) {
  const gradient = GRADIENTS[index % GRADIENTS.length]

  return (
    <div className={`bg-gradient-to-br ${gradient} ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-28 w-28 rounded-full bg-pink/20 blur-2xl" />
        {Icon && <img src={Icon} className="relative text-6xl sm:text-7xl text-ivory/80" />}
      </div>
    </div>
  )
}
