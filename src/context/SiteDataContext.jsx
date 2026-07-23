import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api'

// Fallback static data in case API is unavailable
const FALLBACK_BRAND = {
  name: 'Puपुरुष Collection', short: 'Puपुरुष', tagline: 'Own Your Style.', founder: 'Akash Babu',
  description: 'Premium fashion for the new generation — oversized tees, denim, streetwear and ethnic wear crafted for young men who own their style.',
}

const FALLBACK_STORE = {
  addressLines: ['Main Road,', 'Bridgemanganj,', 'Maharajganj,', 'Uttar Pradesh, India'],
  addressOneLine: 'Main Road, Bridgemanganj, Maharajganj, Uttar Pradesh, India',
  hours: [{ day: 'Monday – Saturday', time: '10:30 AM – 9:00 PM' }, { day: 'Sunday', time: '11:00 AM – 8:00 PM' }],
  mapEmbedSrc: 'https://maps.google.com/maps?q=Main%20Road%2C%20Bridgemanganj%2C%20Maharajganj%2C%20Uttar%20Pradesh%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed',
  phoneDisplay: '+91 80900 33205', phoneHref: 'tel:+918090033205', email: 'hello@purushcollection.in',
}

const FALLBACK_SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/', icon: 'PiInstagramLogoBold' },
  { label: 'Facebook', href: 'https://facebook.com/', icon: 'PiFacebookLogoBold' },
  { label: 'WhatsApp', href: 'https://wa.me/918090033205', icon: 'PiWhatsappLogoBold' },
]

const FALLBACK_HERO = {
  eyebrow: 'Puपुरुष Collection', heading: 'Wear Confidence. Own Your Style.',
  description: 'Premium fashion for the new generation — crafted for young men who own their style.',
  primaryButtonText: 'Explore Collection', primaryButtonLink: '#collections',
  secondaryButtonText: 'Contact Us', secondaryButtonLink: '#contact',
  image: '/purush2.png',
  stats: [{ value: 5, suffix: '+', label: 'Years' }, { value: 500, suffix: '+', label: 'Styles' }, { value: 3000, suffix: '+', label: 'Customers' }],
  chips: [{ label: 'T-Shirts' }, { label: 'Jeans' }, { label: 'Kurtas' }, { label: 'Hoodies' }, { label: 'Sneakers' }],
}

const FALLBACK_ABOUT = {
  heading: 'The Story of Puपुरुष Collection',
  description: 'Born in Bridgemanganj, built for the nation. Puपुरुष Collection started with a simple belief: young men deserve fashion that feels premium, fits perfectly, and never costs more than it should.',
  paragraph: "From oversized streetwear to sharp ethnic fits for weddings and festivals, every collection is chosen with one question in mind — will this make him feel like the best version of himself? That's affordable luxury, done right.",
  image: '/image.png',
  pillars: [
    { number: '01', title: 'Mission', body: 'Bring premium, internationally-inspired fashion to every young man in Bridgemanganj — without the international price tag.' },
    { number: '02', title: 'Vision', body: "Become the name UP's next generation trusts to define how they show up in the world." },
    { number: '03', title: 'Philosophy', body: "Style isn't bought off a shelf — it's built. Every piece we curate is chosen to help you own yours." },
  ],
}

const FALLBACK_FOUNDER = {
  quote: "Fashion isn't about following trends — it's about knowing exactly who you are, and dressing like it. That's what we build for every young man who walks through our doors.",
  description: 'Akash Babu started Puपुरुष Collection with one goal: prove that premium style doesn\'t need a metro-city price tag. Every collection, every fit, every fabric choice comes from that same conviction — Bridgemanganj deserves fashion this good.',
  image: '/founder2.jpeg',
}

const SiteDataContext = createContext(null)

export function SiteDataProvider({ children }) {
  const [data, setData] = useState({
    categories: [],
    settings: {},
    loading: true,
    error: false,
  })

  useEffect(() => {
    async function load() {
      try {
        const [catRes, settingsRes] = await Promise.all([
          axios.get(`${API_URL}/categories?active=true`),
          axios.get(`${API_URL}/settings`),
        ])
        setData({
          categories: catRes.data,
          settings: settingsRes.data,
          loading: false,
          error: false,
        })
      } catch {
        // Use fallback if API unavailable
        setData({
          categories: [],
          settings: {
            hero: FALLBACK_HERO,
            about: FALLBACK_ABOUT,
            founder: FALLBACK_FOUNDER,
            brand: FALLBACK_BRAND,
            store: FALLBACK_STORE,
            socials: FALLBACK_SOCIALS,
            navLinks: [
              { label: 'About', href: '#about' }, { label: 'Collections', href: '#collections' },
              { label: 'Experience', href: '#experience' }, { label: 'Founder', href: '#founder' },
              { label: 'Reviews', href: '#testimonials' }, { label: 'Contact', href: '#contact' },
            ],
            footer: { credit: 'Designed & Developed by Saurabh Agrahari' },
            whyChooseUs: [
              { title: 'Premium Quality', description: 'Fabrics and stitching held to a standard that outlasts trends.' },
              { title: 'Latest Fashion', description: 'Curated drops that track what the streets are actually wearing.' },
              { title: 'Affordable Pricing', description: 'Luxury look and feel, priced for the generation that deserves it.' },
              { title: 'Perfect Fit', description: 'Every silhouette tried, tested, and tailored for real bodies.' },
              { title: 'Premium Collection', description: 'From ethnic wear to streetwear — one wardrobe, every occasion.' },
              { title: 'Trusted Store', description: 'A name Bridgemanganj has relied on, built on word of mouth.' },
              { title: 'Friendly Service', description: 'Walk in as a customer, walk out feeling like family.' },
            ],
            experienceSteps: [
              { number: '01', title: 'Visit Store', description: "Step into Bridgemanganj's home of premium menswear." },
              { number: '02', title: 'Choose Outfit', description: 'Browse curated drops, streetwear to ethnic, all in one place.' },
              { number: '03', title: 'Try It', description: 'Feel the fabric, see the drape, in a fitting made for you.' },
              { number: '04', title: 'Perfect Fit', description: 'Our team fine-tunes every detail until it sits right.' },
              { number: '05', title: 'Take It Home', description: 'Walk out styled, confident, and ready to own it.' },
            ],
            testimonials: [
              { name: 'Rohit Verma', role: 'Regular Customer', quote: 'The fit and fabric quality feels like something out of a Delhi showroom, not a local store. Puपुरुष is my go-to for every drop now.' },
              { name: 'Aman Yadav', role: 'College Student', quote: 'Bought an oversized tee and cargo set for a college fest — got more compliments that day than ever before. Own Your Style is real.' },
              { name: 'Shivam Gupta', role: 'First-time Buyer', quote: 'Walked in for a casual shirt, walked out with a whole new understanding of what my wardrobe was missing. Genuinely premium service.' },
              { name: 'Aditya Singh', role: 'Wedding Season Shopper', quote: 'Got my Pathani stitched for a family wedding here. Perfect fit, sharp finishing, and Akash bhaiya personally made sure everything was right.' },
            ],
            faqs: [
              { question: 'Where is Puपुरुष Collection located?', answer: "We're on Main Road, Bridgemanganj, Maharajganj, Uttar Pradesh. See the map in the Contact section for directions." },
            ],
          },
          loading: false,
          error: false,
        })
      }
    }
    load()
  }, [])

  return (
    <SiteDataContext.Provider value={data}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider')
  return ctx
}

// Helper functions to get specific data
export function useCategories() {
  const { categories } = useSiteData()
  return categories
}

export function useSetting(key) {
  const { settings } = useSiteData()
  return settings[key] || null
}

export function useBrand() {
  return useSetting('brand') || FALLBACK_BRAND
}

export function useStore() {
  return useSetting('store') || FALLBACK_STORE
}

export function useSocials() {
  return useSetting('socials') || FALLBACK_SOCIALS
}

export function useHero() {
  return useSetting('hero') || FALLBACK_HERO
}