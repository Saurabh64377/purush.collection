/**
 * Temporary stand-in photography — a real (if random) photo instead of an
 * icon/placeholder graphic, so the layout reads correctly while real shoot
 * photography isn't available yet. A grayscale + brand-tinted wash keeps
 * random subject matter from looking out of place next to the pink/charcoal
 * palette. Swap the `src` for a real image when ready; everything else
 * (sizing, overlay, rounded corners from the parent) stays the same.
 */
export default function DummyImage({ seed, width = 800, height = 1000, tone = 'dark', eager = false, alt = '', className = '' }) {
  // const src = `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
  const src = `${seed}`
  const washClass = tone === 'dark' ? 'bg-ink/35' : 'bg-pink-deep/8'

  return (
    // No hardcoded `relative` here — callers always pass a positioning class
    // (usually `absolute inset-0`); mixing that with a hardcoded `relative`
    // creates a Tailwind cascade conflict where `absolute` can silently lose
    // (same bug class as EditorialPlaceholder had).
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        {...(eager ? { fetchPriority: 'high' } : {})}
        className="absolute inset-0 h-full w-full object-cover "
      />
      <div className={`absolute inset-0 ${washClass}`} />
    </div>
  )
}
