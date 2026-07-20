// TODO: replace this import once the real files land in src/assets/ —
// expects `logo-badge.png` (the square badge: portrait + पुरुष कलेक्शन) and
// optionally `logo-signboard.jpg` (the full shop signboard photo, used once
// in the About section). Until then this renders a placeholder badge built
// from the same composition/colors.
import logoBadgePlaceholder from '../../assets/logo-badge.svg'

const SIZES = {
  nav: 'h-11 w-11 sm:h-12 sm:w-12',
  footer: 'h-14 w-14',
  loader: 'h-28 w-28 sm:h-36 sm:w-36',
  hero: 'h-40 w-40 sm:h-52 sm:w-52',
}

export default function Logo({ size = 'nav', className = '', rounded = true }) {
  return (
    <img
      src={logoBadgePlaceholder}
      alt="Puपुरुष Collection"
      className={`${SIZES[size]} ${rounded ? 'rounded-2xl' : ''} object-cover ${className}`}
    />
  )
}
