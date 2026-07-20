import { PiInstagramLogoBold, PiFacebookLogoBold, PiWhatsappLogoBold } from 'react-icons/pi'

export const BRAND = {
  name: 'Puपुरुष Collection',
  short: 'Puपुरुष',
  tagline: 'Own Your Style.',
  founder: 'Akash Babu',
  description:
    'Premium fashion for the new generation — oversized tees, denim, streetwear and ethnic wear crafted for young men who own their style.',
}

export const STORE = {
  addressLines: ['Main Road,', 'Bridgemanganj,', 'Maharajganj,', 'Uttar Pradesh, India'],
  addressOneLine: 'Main Road, Bridgemanganj, Maharajganj, Uttar Pradesh, India',
  hours: [
    { day: 'Monday – Saturday', time: '10:30 AM – 9:00 PM' },
    { day: 'Sunday', time: '11:00 AM – 8:00 PM' },
  ],
  mapEmbedSrc:
    'https://maps.google.com/maps?q=Main%20Road%2C%20Bridgemanganj%2C%20Maharajganj%2C%20Uttar%20Pradesh%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed',
  phoneDisplay: '+91 80900 33205',
  phoneHref: 'tel:+9180900 33205',
  email: 'hello@purushcollection.in',
}

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/', icon: PiInstagramLogoBold },
  { label: 'Facebook', href: 'https://facebook.com/', icon: PiFacebookLogoBold },
  { label: 'WhatsApp', href: 'https://wa.me/918090033205', icon: PiWhatsappLogoBold },
]

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'Experience', href: '#experience' },
  { label: 'Founder', href: '#founder' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export const CREDIT = 'Designed & Developed by Saurabh Agrahari'
