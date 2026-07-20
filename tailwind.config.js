/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Deep charcoal — the logo's dark ground, used for full-bleed dark bands
        ink: '#0E0E0E',
        // Soft-black — surface/card tone on dark sections
        charcoal: '#1C1C1C',
        // Off-white — the site's default light background
        cream: '#F6F3EF',
        creamDim: '#EDE8E0',
        // Brand pink — extracted from the "पुरुष" gradient in the logo
        pink: {
          DEFAULT: '#FF3D77',
          light: '#FF7FA8',
          deep: '#D81958',
        },
        ivory: '#FFFFFF',
        graphite: '#111111',
        stone: '#6B6660',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0E0E0E 0%, #7A0F3D 55%, #FF3D77 100%)',
        'brand-radial': 'radial-gradient(circle at 50% 0%, rgba(255,61,119,0.18), transparent 60%)',
      },
      boxShadow: {
        luxury: '0 20px 60px -15px rgba(0,0,0,0.35)',
        pink: '0 0 40px -8px rgba(255,61,119,0.5)',
        deep: '0 20px 60px -15px rgba(0,0,0,0.7)',
      },
      letterSpacing: {
        luxury: '0.25em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
