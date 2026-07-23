import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
const Testimonials = lazy(() => import('./components/sections/Testimonials'))
const FAQ = lazy(() => import('./components/sections/FAQ'))
const Contact = lazy(() => import('./components/sections/Contact'))

const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />

// Site data context for dynamic content
import { SiteDataProvider } from './context/SiteDataContext'

// Admin imports
import { AuthProvider } from './admin/context/AuthContext'
import AdminLayout from './admin/components/AdminLayout'
import Login from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import AdminCollections from './admin/pages/Collections'
import AdminProducts from './admin/pages/Products'
import AdminSettings from './admin/pages/Settings'
import AdminMedia from './admin/pages/Media'

function PublicSite() {
  return (
    <SiteDataProvider>
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
    </SiteDataProvider>
  )
}

function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="collections" element={<AdminCollections />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="media" element={<AdminMedia />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App