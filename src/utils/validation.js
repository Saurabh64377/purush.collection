import { z } from 'zod'

export const AGE_OPTIONS = Array.from({ length: 9 }, (_, i) => String(16 + i))

export const INTEREST_OPTIONS = [
  'Oversized T-Shirt',
  'Graphic T-Shirt',
  'Baggy Jeans',
  'Slim Jeans',
  'Cargo Pants',
  'Joggers',
  'Kurta',
  'Pathani',
  'Formal Shirt',
  'Printed Shirt',
  'Blazer',
  'Jacket',
  'Hoodie',
  'Sweatshirt',
  'Co-Ord Set',
  'Casual Wear',
  'Party Wear',
  'Wedding Collection',
  'Sneakers',
  'Wallet',
  'Cap',
  'Belt',
  'Accessories',
  'Other',
]

export const BUDGET_OPTIONS = ['Below ₹1000', '₹1000–2000', '₹2000–4000', '₹4000+']

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(60, 'Name looks too long'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  age: z.enum(AGE_OPTIONS, { message: 'Select your age' }),
  interestedIn: z.enum(INTEREST_OPTIONS, {
    message: 'Select what you\'re interested in',
  }),
  budget: z.enum(BUDGET_OPTIONS, { message: 'Select a budget range' }),
  message: z
    .string()
    .trim()
    .min(10, 'Tell us a little more (min 10 characters)')
    .max(500, 'Message is too long'),
})
