import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PiPlusBold } from 'react-icons/pi'
import SectionHeading from '../ui/SectionHeading'
import { FAQS } from '../../data/faq'

function FaqItem({ faq, isOpen, onToggle, id }) {
  return (
    <div className="border-b border-graphite/10">
      <h3>
        <button
          type="button"
          id={`faq-trigger-${id}`}
          onClick={onToggle}
          data-cursor-hover
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${id}`}
          className="w-full flex items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-lg sm:text-xl text-graphite">{faq.question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-graphite/15 text-pink"
          >
            <PiPlusBold />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-trigger-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-stone leading-relaxed max-w-2xl">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative bg-cream py-28 sm:py-36">
      <div className="section-container max-w-3xl mx-auto flex flex-col gap-14">
        <SectionHeading eyebrow="FAQ" title="Common Questions" align="center" />

        <div>
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.question}
              id={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
