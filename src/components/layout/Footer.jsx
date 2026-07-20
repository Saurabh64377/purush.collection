import Logo from '../logo/Logo'
import { BRAND, STORE, SOCIALS, NAV_LINKS, CREDIT } from '../../utils/constants'
import { COLLECTIONS } from '../../data/collections'

const FOOTER_COLLECTIONS = COLLECTIONS.slice(0, 6)

export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-ivory/8 pt-20 pb-8 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-radial blur-3xl" />

      <div className="section-container relative grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Logo size="footer" />
            <span className="font-display text-lg text-ivory">{BRAND.short}</span>
          </div>
          <p className="text-sm text-ivory/60 leading-relaxed max-w-xs">{BRAND.description}</p>
          <div className="flex items-center gap-4 pt-1">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                data-cursor-hover
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 hover:border-pink hover:text-pink transition-colors duration-300"
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-luxury text-pink mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} data-cursor-hover className="text-sm text-ivory/60 hover:text-ivory transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-luxury text-pink mb-5">Collections</h3>
          <ul className="space-y-3">
            {FOOTER_COLLECTIONS.map((c) => (
              <li key={c.name}>
                <a href="#collections" data-cursor-hover className="text-sm text-ivory/60 hover:text-ivory transition-colors">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-luxury text-pink mb-5">Visit Us</h3>
          <address className="not-italic text-sm text-ivory/60 leading-relaxed space-y-1">
            {STORE.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
          <p className="text-sm text-ivory/60 mt-4">
            Founder — <span className="text-ivory">{BRAND.founder}</span>
          </p>
        </div>
      </div>

      <div className="section-container mt-16 pt-8 border-t border-ivory/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/40">
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <p>{CREDIT}</p>
      </div>
    </footer>
  )
}
