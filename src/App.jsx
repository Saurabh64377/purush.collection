import { lazy, Suspense } from 'react'
import SmoothScrollProvider from './components/layout/SmoothScrollProvider'
import PageLoader from './components/layout/PageLoader'
import NoiseOverlay from './components/layout/NoiseOverlay'
import MouseGlow from './components/layout/MouseGlow'
import CustomCursor from './components/layout/CustomCursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingActions from './components/layout/FloatingActions'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Collections from './components/sections/Collections'
import WhyChooseUs from './components/sections/WhyChooseUs'
import FashionExperience from './components/sections/FashionExperience'
import Founder from './components/sections/Founder'

// Code-split below-the-fold sections that pull in heavier dependencies
// (Swiper for Testimonials; react-hook-form + zod + emailjs for Contact).
const Testimonials = lazy(() => import('./components/sections/Testimonials'))
const FAQ = lazy(() => import('./components/sections/FAQ'))
const Contact = lazy(() => import('./components/sections/Contact'))

const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />

function App() {
  return (
    <SmoothScrollProvider>
      <PageLoader />
      <NoiseOverlay />
      <MouseGlow />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Collections />
        <WhyChooseUs />
        <FashionExperience />
        <Founder />
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
          <FAQ />
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />
    </SmoothScrollProvider>
  )
}

export default App
