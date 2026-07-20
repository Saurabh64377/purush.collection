import { useMemo, useState } from 'react'
import SectionHeading from '../../ui/SectionHeading'
import CollectionCard from './CollectionCard'
import { COLLECTIONS } from '../../../data/collections'

const FILTERS = ['All', 'Trending', 'New']

export default function Collections() {
  const [filter, setFilter] = useState('All')

  const items = useMemo(() => {
    if (filter === 'All') return COLLECTIONS
    return COLLECTIONS.filter((c) => c.tag === filter)
  }, [filter])

  return (
    <section id="collections" className="relative bg-cream py-28 sm:py-36">
      <div className="section-container flex flex-col gap-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <SectionHeading
            eyebrow="The Collection"
            title="Featured Collections"
            description="From everyday streetwear to the sharpest festive fits — a wardrobe built for every version of you."
          />
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                data-cursor-hover
                className={`rounded-full px-5 py-2 text-xs uppercase tracking-wide border transition-colors duration-300 ${
                  filter === f
                    ? 'border-pink text-pink bg-pink/10'
                    : 'border-graphite/15 text-stone hover:border-graphite/40 hover:text-graphite'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <CollectionCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
