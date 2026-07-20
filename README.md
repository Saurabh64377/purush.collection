# Puपुरुष Collection — Premium Fashion Landing Page

A premium, editorial React landing page for Puपुरुष Collection — a menswear
streetwear brand in Bridgemanganj, Maharajganj. Branding and lead-generation
only: no cart, no checkout, no backend.

## Stack

Vite · React 19 · Tailwind CSS · Framer Motion · GSAP (ScrollTrigger) · Lenis ·
React Hook Form + Zod · EmailJS · Swiper

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Contact form / EmailJS setup

The contact form sends leads via [EmailJS](https://www.emailjs.com) — no backend required.

1. Create a free account at emailjs.com and add an Email Service (e.g. Gmail).
2. Create an Email Template with these variables available to use in the template body:
   `customer_name`, `customer_email`, `customer_phone`, `customer_age`,
   `interested_product`, `budget`, `message`, `submitted_at`.
3. Copy your **Service ID**, **Template ID**, and **Public Key** (Account → General)
   into a `.env` file in the project root (see `.env.example`):

   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
   ```

4. Restart `npm run dev` after editing `.env`.

Until these are filled in, submitting the form will show the error state —
this is expected and by design (no silent failures).

## Things still needed from the brand before launch

- **Real photography** — every photo on the site (Hero campaign shot, About's
  shop signboard, Founder portrait, every Collection card) is currently a
  random stand-in image from picsum.photos via `src/components/ui/DummyImage.jsx`,
  so the layout reads correctly instead of showing blank boxes. Replace by
  swapping the `seed`/`src` in each usage for a real `<img>` — layout, rounded
  corners, and the grayscale/tint treatment are all handled by the wrapper,
  so swapping is a one-line change per spot.
- **Real logo files** — `src/components/logo/Logo.jsx` currently renders a
  placeholder badge (`src/assets/logo-badge.svg`) built to match the real
  logo's composition/colors. Save the actual logo file into `src/assets/`
  and update the import in `Logo.jsx` to use it everywhere (navbar, footer,
  loader, hero, favicon).
- **EmailJS credentials** — see above.
- **Real testimonials** — `src/data/testimonials.js` currently holds
  placeholder reviews, clearly marked with a comment.
- **Store phone number / WhatsApp number / socials** — placeholder values
  live in `src/utils/constants.js` (`STORE`, `SOCIALS`). The floating
  WhatsApp button in the bottom-right corner (`components/layout/FloatingActions.jsx`)
  reads its link from `SOCIALS` — update the WhatsApp entry there to the
  real number.

## Project structure

```
src/
  components/
    layout/     Navbar, Footer, cursor, loader, smooth-scroll, floating
                 WhatsApp/scroll-to-top actions, glow, noise
    ui/         Reusable primitives (buttons, headings, text reveal,
                 image-reveal mask, dummy-photo wrapper, etc.)
    logo/       Logo.jsx — the brand mark (currently a placeholder badge)
    sections/   One folder/file per landing-page section
  data/         Static content arrays (collections, FAQ, testimonials, etc.)
  hooks/        Small reusable hooks (media queries, magnetic buttons, etc.)
  lib/          Lenis smooth-scroll + EmailJS wrappers
  utils/        Brand constants + Zod validation schemas
```

## Design notes

- Palette extracted from the real logo: brand pink (`#FF3D77` family), deep
  charcoal (`ink`/`charcoal`), and an off-white `cream` base — no gold, no
  pure-black-and-gold "tech luxury" look. Sections alternate cream/dark
  bands, editorial-magazine style (Zara/Bershka/COS pattern), not a
  uniformly dark theme.
- No 3D/WebGL — motion comes entirely from Framer Motion, GSAP ScrollTrigger
  (the pinned horizontal "Fashion Experience" timeline), and Lenis smooth
  scroll.
- Testimonials/Contact are code-split via `React.lazy`; the Swiper carousel
  in Testimonials is initialized with `observer`/`observeParents` since it
  mounts inside a lazy boundary — without those it can measure a bad width
  on first mount and needs a DOM mutation to trigger a re-measure.
- Custom cursor and mouse-spotlight are disabled on touch/coarse-pointer
  devices and respect `prefers-reduced-motion`.

---

Designed & Developed by Saurabh Agrahari
