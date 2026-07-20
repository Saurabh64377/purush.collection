import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { WHY_CHOOSE_US } from '../../data/whyChooseUs'

export default function WhyChooseUs() {
  return (
    <section className="relative bg-ink py-28 sm:py-36">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow="Why Puपुरुष"
          title="Why Choose Us"
          align="center"
          inverse
          description="Seven reasons Bridgemanganj keeps coming back."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
          {WHY_CHOOSE_US.map(({ title, description, icon: Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.08 }}
              className="group flex items-start gap-5 border-t border-ivory/10 py-7"
            >
              <span className="font-display text-lg text-pink w-8 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <Icon className="text-xl text-ivory/40 flex-shrink-0 mt-1 group-hover:text-pink transition-colors duration-300" />
              <div>
                <h3 className="font-display text-lg font-semibold text-ivory">{title}</h3>
                <p className="text-sm text-ivory/55 leading-relaxed mt-1">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
