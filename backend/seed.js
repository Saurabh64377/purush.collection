import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Category from './models/Category.js';
import Setting from './models/Setting.js';

const categories = [
  { name: 'Oversized T-Shirts', image: 'https://images.meesho.com/images/products/948442586/slkts_512.avif?width=512', tag: 'Trending', order: 0 },
  { name: 'Graphic T-Shirts', image: 'https://veirdo.in/cdn/shop/files/Artboard39_12.jpg?v=1759494169', order: 1 },
  { name: 'Baggy Jeans', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQZ1biJ0w1qdCx28guy7obC0lMOYAMNnKk2sUPqvmYB4VPkh_C1rAEs0xrI9AUJDJv6ffk39nLrYBGvR1r2UYRsxHxoPoka1ZutWKC6AcyimO8961egRm0KH9oANtn-1jz8ZzSalA&usqp=CAc', tag: 'Trending', order: 2 },
  { name: 'Slim Fit Jeans', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRyA9T77ZHZ2cTXEhZN3VIpO_ygfc7gpULcwES_5zN48yU9nkmc5oZcRELv-SWXvSGA6XjfeqRLU7E0yE2DHr-fFZe9WgTltZ1EHkubUM-USlMBIlnLrNrH&usqp=CAc', order: 3 },
  { name: 'Cargo Pants', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRZsMSJN2QT0dmwtsPbkDeUIeBrMWX1Qv9hcN03rlx0Qrmcsxw_UQ0hsAu4SrncuIqGV4aVUWl51n0uiPQMQaJO9vlhwrz9BSBwYbuNgHw9IAHXnh8&usqp=CAc', order: 4 },
  { name: 'Joggers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_MG-hiCde8tmFxqUS37fSgchBzqysael98SHbH-z_Zg&s=10', order: 5 },
  { name: 'Formal Shirts', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSMaFPul11TyiXz7LR4w-4gRZG6uCzb2Oz27R-Ha8mUMniRIUHO4CR-V5OPD0rIzydFMBKWIvuv1qzsU0Q1-trwzw5iHDl-KtGwE2uls2BljZDU7xE7i-MpQFg&usqp=CAc', order: 6 },
  { name: 'Printed Shirts', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQI7YupOugsUU4y0HHKzMts8za3k4SPqx39zHhNjH7u8za4NiTOSrg-a0IPM1Mi4HhqD6d-JCivAtpeQUDeL2xFt_fgWHcSxOs7X9eWkWGLkJTXzo2LR38b5Q&usqp=CAc', order: 7 },
  { name: 'Kurta', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSBXuPwskwszk7qvm7kODimyz1vQ8LRqEHNSKfjw7DO5gZYP7NmWRVzstxgrgUP1GzazS3fX_8J_AJvZs0UmSEtP4u49fFPot9Z1o_fLIJc80Ct5w_J75aZbQ&usqp=CAc', order: 8 },
  { name: 'Pathani', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTfsLP92JwYYEm-DkOY-FhGpRiGur4SUo0UIxll8k4ILP3ryCRKtpK9KfXOgLQqFGXqzyUTfCuTVwd_MDIi8gePwuxsPIFahgWZuknrSpzM2x8n7fZlGwNj&usqp=CAc', order: 9 },
  { name: 'Blazer', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTsb8Fol4GDkWqfEHsACfLyVqmECR4WQidm9HntPkn8BFJDq3NHWLRNs8JoCAZmsHDOUFhQ3KuDaGSzt64Q9ss6PZ7KiAAlYEyh1Vqngdom4Ds1Prd23FeVL0uODrCxlmGhdl3QASaa&usqp=CAc', order: 10 },
  { name: 'Hoodies', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTp1-7V1-exWXrCY3i1mBnzLRGb1TATW0TUBD8BCV3ysNPmjE10z1PHZvPVcdNBrgJk0BaNXhyBRJ66H-rS3WaJIi9is77kTZ8BQrFXxAoSKB3ZRpCRP8WPyg&usqp=CAc', tag: 'Trending', order: 11 },
  { name: 'Sweatshirts', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQbZNm1NLuaxe-t0_mzShOzirfU5NK5YYS-17KqC_XEzm3q1yh7LrfmzuwBFeLVgAy3yS3jwBpmnAfaXk4gHhutSOhB5UPJBpdLLI1J1KC7iluRn5V96GB3&usqp=CAc', order: 12 },
  { name: 'Jackets', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT17edTU8lOCyY-vsHlgakMGdjGnS-tLuBNXkhLC2DPynn8EdRKR1TyIef-nrsclR7m4YLT8bVqGawj_vL_VQyLqvoDFWRH7H5hlXaUa-qywWIQ1DJTGZZN7XND1eP7jw9VrINqGSc&usqp=CAc', order: 13 },
  { name: 'Co-Ord Sets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnu103HWbY1xG6nBiUSoMmBMn1PsD_H1b8i1E3FI5otw&s=10', tag: 'New', order: 14 },
  { name: 'Casual Wear', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSb9P83PjHTR-FAYCFFU2jPNz4S8ngVDvUEXQRqfU_w&s=10', order: 15 },
  { name: 'Party Wear', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlxzFGr5ykWJykGFUKU0v0z7jSlHLw-ZcZUQvDHlDEQ&s=10', order: 16 },
  { name: 'Wedding Collection', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYAtIXI7g4-rvBh_6_C76WiUoCAKmbL07mfAZSCRGvtw&s=10', order: 17 },
  { name: 'Sneakers', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRgeyA5i8UqCrHW1BHE_QDd3MTMDNh_LHmPHNmEm2yGR64h8Ik6QLTcW2bNELHo0fmVWqnMUIsGwm7bIV6CYkkDB8Z8NS-G64qre5IXGgSiDCpkUXmIJfmEFA&usqp=CAc', tag: 'Trending', order: 18 },
  { name: 'Caps', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXSnl8hs-J4YmUyUxfpG1NdWXIgV5nBpCDe2jnVgBBdg&s=10', order: 19 },
  { name: 'Belts', image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/belt/m/k/7/34-leather-belts-for-men-ua-tmbk19-tmbr19-34-2pc-belts-for-men-original-imah2wx6hjv6wpfy.jpeg?q=90', order: 20 },
  { name: 'Wallets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgBFn2uIH9ufVir70c1jA6lbY0GkrkU61KsbbzTFy42g&s=10', order: 21 },
  { name: 'Sunglasses', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRItiRb2VM67VYW0ecWSN7U_W60BapH-OL3cIpM33NJAw&s=10', order: 22 },
  { name: 'Accessories', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQheQqJDynv_IsuRsvcjIX2vJ-H7KshcUKDgGe1U59bgq74SJ3NXXJ0Xso&s=10', order: 23 },
];

const settings = [
  {
    key: 'hero',
    value: {
      eyebrow: 'Puपुरुष Collection',
      heading: 'Wear Confidence. Own Your Style.',
      description: 'Premium fashion for the new generation — crafted for young men who own their style.',
      primaryButtonText: 'Explore Collection',
      primaryButtonLink: '#collections',
      secondaryButtonText: 'Contact Us',
      secondaryButtonLink: '#contact',
      image: '/purush2.png',
      stats: [
        { value: 5, suffix: '+', label: 'Years' },
        { value: 500, suffix: '+', label: 'Styles' },
        { value: 3000, suffix: '+', label: 'Customers' },
      ],
      chips: [
        { label: 'T-Shirts' },
        { label: 'Jeans' },
        { label: 'Kurtas' },
        { label: 'Hoodies' },
        { label: 'Sneakers' },
      ],
    },
  },
  {
    key: 'about',
    value: {
      heading: 'The Story of Puपुरुष Collection',
      description: 'Born in Bridgemanganj, built for the nation. Puपुरुष Collection started with a simple belief: young men deserve fashion that feels premium, fits perfectly, and never costs more than it should.',
      paragraph: 'From oversized streetwear to sharp ethnic fits for weddings and festivals, every collection is chosen with one question in mind — will this make him feel like the best version of himself? That\'s affordable luxury, done right.',
      image: '/image.png',
      pillars: [
        { number: '01', title: 'Mission', body: 'Bring premium, internationally-inspired fashion to every young man in Bridgemanganj — without the international price tag.' },
        { number: '02', title: 'Vision', body: 'Become the name UP\'s next generation trusts to define how they show up in the world.' },
        { number: '03', title: 'Philosophy', body: 'Style isn\'t bought off a shelf — it\'s built. Every piece we curate is chosen to help you own yours.' },
      ],
    },
  },
  {
    key: 'founder',
    value: {
      quote: 'Fashion isn\'t about following trends — it\'s about knowing exactly who you are, and dressing like it. That\'s what we build for every young man who walks through our doors.',
      description: 'Akash Babu started Puपुरुष Collection with one goal: prove that premium style doesn\'t need a metro-city price tag. Every collection, every fit, every fabric choice comes from that same conviction — Bridgemanganj deserves fashion this good.',
      image: '/founder2.jpeg',
    },
  },
  {
    key: 'brand',
    value: {
      name: 'Puपुरुष Collection',
      short: 'Puपुरुष',
      tagline: 'Own Your Style.',
      founder: 'Akash Babu',
      description: 'Premium fashion for the new generation — oversized tees, denim, streetwear and ethnic wear crafted for young men who own their style.',
    },
  },
  {
    key: 'store',
    value: {
      addressLines: ['Main Road,', 'Bridgemanganj,', 'Maharajganj,', 'Uttar Pradesh, India'],
      addressOneLine: 'Main Road, Bridgemanganj, Maharajganj, Uttar Pradesh, India',
      hours: [
        { day: 'Monday – Saturday', time: '10:30 AM – 9:00 PM' },
        { day: 'Sunday', time: '11:00 AM – 8:00 PM' },
      ],
      mapEmbedSrc: 'https://maps.google.com/maps?q=Main%20Road%2C%20Bridgemanganj%2C%20Maharajganj%2C%20Uttar%20Pradesh%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed',
      phoneDisplay: '+91 80900 33205',
      phoneHref: 'tel:+918090033205',
      email: 'hello@purushcollection.in',
    },
  },
  {
    key: 'socials',
    value: [
      { label: 'Instagram', href: 'https://instagram.com/', icon: 'PiInstagramLogoBold' },
      { label: 'Facebook', href: 'https://facebook.com/', icon: 'PiFacebookLogoBold' },
      { label: 'WhatsApp', href: 'https://wa.me/918090033205', icon: 'PiWhatsappLogoBold' },
    ],
  },
  {
    key: 'navLinks',
    value: [
      { label: 'About', href: '#about' },
      { label: 'Collections', href: '#collections' },
      { label: 'Experience', href: '#experience' },
      { label: 'Founder', href: '#founder' },
      { label: 'Reviews', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    key: 'footer',
    value: { credit: 'Designed & Developed by Saurabh Agrahari' },
  },
  {
    key: 'whyChooseUs',
    value: [
      { title: 'Premium Quality', description: 'Fabrics and stitching held to a standard that outlasts trends.' },
      { title: 'Latest Fashion', description: 'Curated drops that track what the streets are actually wearing.' },
      { title: 'Affordable Pricing', description: 'Luxury look and feel, priced for the generation that deserves it.' },
      { title: 'Perfect Fit', description: 'Every silhouette tried, tested, and tailored for real bodies.' },
      { title: 'Premium Collection', description: 'From ethnic wear to streetwear — one wardrobe, every occasion.' },
      { title: 'Trusted Store', description: 'A name Bridgemanganj has relied on, built on word of mouth.' },
      { title: 'Friendly Service', description: 'Walk in as a customer, walk out feeling like family.' },
    ],
  },
  {
    key: 'experienceSteps',
    value: [
      { number: '01', title: 'Visit Store', description: 'Step into Bridgemanganj\'s home of premium menswear.' },
      { number: '02', title: 'Choose Outfit', description: 'Browse curated drops, streetwear to ethnic, all in one place.' },
      { number: '03', title: 'Try It', description: 'Feel the fabric, see the drape, in a fitting made for you.' },
      { number: '04', title: 'Perfect Fit', description: 'Our team fine-tunes every detail until it sits right.' },
      { number: '05', title: 'Take It Home', description: 'Walk out styled, confident, and ready to own it.' },
    ],
  },
  {
    key: 'testimonials',
    value: [
      { name: 'Rohit Verma', role: 'Regular Customer', quote: 'The fit and fabric quality feels like something out of a Delhi showroom, not a local store. Puपुरुष is my go-to for every drop now.' },
      { name: 'Aman Yadav', role: 'College Student', quote: 'Bought an oversized tee and cargo set for a college fest — got more compliments that day than ever before. Own Your Style is real.' },
      { name: 'Shivam Gupta', role: 'First-time Buyer', quote: 'Walked in for a casual shirt, walked out with a whole new understanding of what my wardrobe was missing. Genuinely premium service.' },
      { name: 'Aditya Singh', role: 'Wedding Season Shopper', quote: 'Got my Pathani stitched for a family wedding here. Perfect fit, sharp finishing, and Akash bhaiya personally made sure everything was right.' },
    ],
  },
  {
    key: 'faqs',
    value: [
      { question: 'Where is Puपुरुष Collection located?', answer: 'We\'re on Main Road, Bridgemanganj, Maharajganj, Uttar Pradesh. See the map in the Contact section for directions.' },
      { question: 'Do you sell online or only in-store?', answer: 'Right now we operate as an in-store premium experience. Use the contact form to enquire about a product and we\'ll personally get in touch to help you.' },
      { question: 'What sizes do you carry?', answer: 'Our collection spans a wide range of fits, from slim to oversized, with sizes to suit builds across the 16–24 age group and beyond.' },
      { question: 'Can I get styling advice before I buy?', answer: 'Absolutely. Visit the store and our team will help you find the fit, fabric and look that suits you best — no pressure, just honest guidance.' },
      { question: 'Do you restock trending items?', answer: 'Yes. Trending and New Arrival pieces are restocked regularly. Follow our socials or drop us a message to know when your size is back.' },
      { question: 'Do you have outfits for weddings and parties?', answer: 'Yes — our Wedding Collection and Party Wear range covers everything from festive kurtas to sharp blazers for the occasion.' },
    ],
  },
  {
    key: 'contactForm',
    value: {
      ageOptions: ['16', '17', '18', '19', '20', '21', '22', '23', '24'],
      interestOptions: [
        'Oversized T-Shirt', 'Graphic T-Shirt', 'Baggy Jeans', 'Slim Jeans', 'Cargo Pants',
        'Joggers', 'Kurta', 'Pathani', 'Formal Shirt', 'Printed Shirt', 'Blazer', 'Jacket',
        'Hoodie', 'Sweatshirt', 'Co-Ord Set', 'Casual Wear', 'Party Wear', 'Wedding Collection',
        'Sneakers', 'Wallet', 'Cap', 'Belt', 'Accessories', 'Other',
      ],
      budgetOptions: ['Below ₹1000', '₹1000–2000', '₹2000–4000', '₹4000+'],
    },
  },
  {
    key: 'collectionsSection',
    value: {
      eyebrow: 'The Collection',
      title: 'Featured Collections',
      description: 'From everyday streetwear to the sharpest festive fits — a wardrobe built for every version of you.',
    },
  },
  {
    key: 'whyChooseUsSection',
    value: {
      eyebrow: 'Why Puपुरुष',
      title: 'Why Choose Us',
      description: 'Seven reasons Bridgemanganj keeps coming back.',
    },
  },
  {
    key: 'experienceSection',
    value: {
      eyebrow: 'The Experience',
      title: 'The Fashion Experience',
      description: 'Five steps between walking in and walking out looking like the best version of yourself.',
    },
  },
  {
    key: 'testimonialsSection',
    value: {
      eyebrow: 'Reviews',
      title: 'What Customers Say',
      description: 'Real words from young men who found their style with us.',
    },
  },
  {
    key: 'faqSection',
    value: {
      eyebrow: 'FAQ',
      title: 'Common Questions',
    },
  },
  {
    key: 'contactSection',
    value: {
      eyebrow: 'Get In Touch',
      title: 'Let\'s Talk Style',
      description: 'Have a question, want to check stock, or just want styling advice? Reach out — we personally respond to every message.',
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Setting.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user (password will be hashed by the User model's pre-save hook)
    await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    });
    console.log(`Admin user created: ${process.env.ADMIN_EMAIL}`);

    // Create categories
    await Category.insertMany(categories);
    console.log(`${categories.length} categories created`);

    // Create settings
    await Setting.insertMany(settings);
    console.log(`${settings.length} settings created`);

    console.log('\nSeed completed successfully!');
    console.log('Admin login credentials:');
    console.log(`  Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();