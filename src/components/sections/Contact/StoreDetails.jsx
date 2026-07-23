import { motion } from 'framer-motion'
import { PiMapPinBold, PiClockBold, PiUserBold, PiPhoneBold } from 'react-icons/pi'
import { useStore, useBrand } from '../../../context/SiteDataContext'

export default function StoreDetails() {
  const store = useStore()
  const brand = useBrand()

  const ITEMS = [
    { icon: PiMapPinBold, label: 'Address', value: store.addressOneLine },
    { icon: PiUserBold, label: 'Founder', value: brand.founder },
    { icon: PiPhoneBold, label: 'Phone', value: store.phoneDisplay, href: store.phoneHref },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-5">
        {ITEMS.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex items-start gap-4">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-pink/10 border border-pink/20">
              <Icon className="text-lg text-pink" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-ivory/50">{label}</p>
              {href ? (
                <a href={href} data-cursor-hover className="text-ivory hover:text-pink transition-colors">
                  {value}
                </a>
              ) : (
                <p className="text-ivory">{value}</p>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-pink/10 border border-pink/20">
            <PiClockBold className="text-lg text-pink" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wide text-ivory/50">Opening Hours</p>
            {(store.hours || []).map((h) => (
              <p key={h.day} className="text-ivory text-sm">
                <span className="text-ivory/50">{h.day}:</span> {h.time}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative aspect-video w-full rounded-2xl overflow-hidden ring-1 ring-ivory/10">
        <iframe
          title="Puपुरुष Collection store location"
          src={store.mapEmbedSrc}
          className="absolute inset-0 h-full w-full grayscale-[60%] contrast-125 invert-[0.92]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>
  )
}