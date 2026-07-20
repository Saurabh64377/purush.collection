import SectionHeading from '../../ui/SectionHeading'
import StoreDetails from './StoreDetails'
import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="relative bg-ink py-28 sm:py-36">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Talk Style"
          inverse
          description="Have a question, want to check stock, or just want styling advice? Reach out — we personally respond to every message."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <StoreDetails />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
