import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../ui/SectionHeading'
import {
  PiStorefrontBold, PiCoatHangerBold, PiTShirtBold, PiRulerBold, PiShoppingBagOpenBold,
} from 'react-icons/pi'
import { useSetting } from '../../context/SiteDataContext'

gsap.registerPlugin(ScrollTrigger)

const ICONS = [PiStorefrontBold, PiCoatHangerBold, PiTShirtBold, PiRulerBold, PiShoppingBagOpenBold]

export default function FashionExperience() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const steps = useSetting('experienceSteps') || []

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current
        const viewport = viewportRef.current
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.offsetWidth)

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })

        return () => tween.scrollTrigger?.kill()
      })

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [steps.length])

  return (
    <section id="experience" ref={sectionRef} className="relative bg-cream overflow-hidden">
      <div className="lg:h-screen flex flex-col justify-center py-28 lg:py-0">
        <div className="section-container mb-12 lg:mb-14">
          <SectionHeading
            eyebrow="The Experience"
            title="The Fashion Experience"
            description="Five steps between walking in and walking out looking like the best version of yourself."
          />
        </div>

        <div ref={viewportRef} className="lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col gap-6 lg:flex-row lg:gap-8 lg:w-max px-6 sm:px-10 lg:pl-16 lg:pr-24"
          >
            {steps.map(({ number, title, description }, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <motion.div
                  key={number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative flex-shrink-0 w-full lg:w-[380px] bg-ivory ring-1 ring-graphite/10 shadow-luxury rounded-3xl p-9 flex flex-col gap-6"
                >
                  <span className="text-6xl font-display font-semibold text-graphite/10">{number}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink/10 border border-pink/20">
                    {Icon && <Icon className="text-xl text-pink" />}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-graphite">{title}</h3>
                  <p className="text-sm text-stone leading-relaxed">{description}</p>
                  {i < steps.length - 1 && (
                    <span className="hidden lg:block absolute top-1/2 -right-8 w-8 h-px bg-gradient-to-r from-pink/60 to-transparent" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}