import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const isEmailjsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

export async function sendContactEmail(fields) {
  if (!isEmailjsConfigured) {
    throw new Error(
      'EmailJS is not configured yet. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to your .env file.'
    )
  }

  const templateParams = {
    customer_name: fields.fullName,
    customer_email: fields.email,
    customer_phone: fields.phone,
    customer_age: fields.age,
    interested_product: fields.interestedIn,
    budget: fields.budget,
    message: fields.message,
    submitted_at: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
  }

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
}
