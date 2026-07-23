import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

// Pre-defined setting keys:
// hero -> { heading, subtitle, buttonText, buttonLink, secondaryButtonText, secondaryButtonLink, image, backgroundImage, stats: [{ value, suffix, label }], chips: [{ label }] }
// about -> { heading, description, image, pillars: [{ number, title, body }] }
// founder -> { quote, description, image }
// brand -> { name, short, tagline, founder, description }
// store -> { addressLines, addressOneLine, hours, mapEmbedSrc, phoneDisplay, phoneHref, email }
// socials -> [{ label, href, icon }]
// navLinks -> [{ label, href }]
// footer -> { credit }
// whyChooseUs -> [{ title, description }]
// experienceSteps -> [{ number, title, description }]
// testimonials -> [{ name, role, quote }]
// faqs -> [{ question, answer }]
// contactForm -> { ageOptions, interestOptions, budgetOptions }

export default mongoose.model('Setting', settingSchema);