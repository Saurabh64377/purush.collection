import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { PiSpinnerBold, PiCheckCircleBold, PiWarningCircleBold, PiCaretDownBold } from 'react-icons/pi'
import { contactSchema, AGE_OPTIONS, INTEREST_OPTIONS, BUDGET_OPTIONS } from '../../../utils/validation'
import { sendContactEmail } from '../../../lib/emailjs'
import MagneticButton from '../../ui/MagneticButton'

const fieldClass =
  'peer w-full rounded-xl bg-ivory/5 border border-ivory/15 px-4 pt-6 pb-2 text-sm text-ivory focus:outline-none focus:border-pink/60 focus:ring-1 focus:ring-pink/30 transition-colors duration-300'

// Floating label: sits centered like a placeholder until the field is
// focused or filled, then floats up small. CSS-only via peer + :placeholder-shown.
const floatingLabelClass =
  'absolute left-4 top-4 text-sm text-ivory/40 pointer-events-none transition-all duration-200 ' +
  'peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wide peer-focus:text-pink ' +
  'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wide peer-[:not(:placeholder-shown)]:text-ivory/50'

// Select variant: floats only once a real option is chosen (native
// :placeholder-shown doesn't apply to <select>, so this uses :invalid on a
// required field with an empty first option instead).
const selectLabelClass =
  'absolute left-4 top-2 text-[10px] uppercase tracking-wide text-pink pointer-events-none transition-all duration-200 ' +
  'peer-invalid:top-4 peer-invalid:text-sm peer-invalid:normal-case peer-invalid:tracking-normal peer-invalid:text-ivory/40'

const errorClass = 'text-xs text-pink-light mt-1.5'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data) => {
    setStatus('sending')
    setErrorMessage('')
    try {
      await sendContactEmail(data)
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err?.text || err?.message || 'Something went wrong. Please try again.')
    }
  }

  const sending = status === 'sending'

  return (
    <motion.form
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="glass-dark rounded-3xl p-7 sm:p-9 flex flex-col gap-5"
    >
      <div className="relative">
        <input id="fullName" type="text" autoComplete="name" placeholder=" " className={fieldClass} {...register('fullName')} />
        <label htmlFor="fullName" className={floatingLabelClass}>Full Name</label>
        {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="relative">
          <input id="email" type="email" autoComplete="email" placeholder=" " className={fieldClass} {...register('email')} />
          <label htmlFor="email" className={floatingLabelClass}>Email Address</label>
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div className="relative">
          <input id="phone" type="tel" autoComplete="tel" placeholder=" " className={fieldClass} {...register('phone')} />
          <label htmlFor="phone" className={floatingLabelClass}>Phone Number</label>
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="relative">
          <select id="age" defaultValue="" required className={`${fieldClass} appearance-none`} {...register('age')}>
            <option value="" disabled hidden></option>
            {AGE_OPTIONS.map((a) => (
              <option key={a} value={a} className="bg-ink text-ivory">{a}</option>
            ))}
          </select>
          <label htmlFor="age" className={selectLabelClass}>Age</label>
          <PiCaretDownBold className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ivory/40 text-sm" />
          {errors.age && <p className={errorClass}>{errors.age.message}</p>}
        </div>

        <div className="relative">
          <select id="interestedIn" defaultValue="" required className={`${fieldClass} appearance-none`} {...register('interestedIn')}>
            <option value="" disabled hidden></option>
            {INTEREST_OPTIONS.map((o) => (
              <option key={o} value={o} className="bg-ink text-ivory">{o}</option>
            ))}
          </select>
          <label htmlFor="interestedIn" className={selectLabelClass}>Interested In</label>
          <PiCaretDownBold className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ivory/40 text-sm" />
          {errors.interestedIn && <p className={errorClass}>{errors.interestedIn.message}</p>}
        </div>

        <div className="relative">
          <select id="budget" defaultValue="" required className={`${fieldClass} appearance-none`} {...register('budget')}>
            <option value="" disabled hidden></option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b} className="bg-ink text-ivory">{b}</option>
            ))}
          </select>
          <label htmlFor="budget" className={selectLabelClass}>Budget</label>
          <PiCaretDownBold className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ivory/40 text-sm" />
          {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
        </div>
      </div>

      <div className="relative">
        <textarea
          id="message"
          rows={4}
          placeholder=" "
          className={`${fieldClass} resize-none`}
          {...register('message')}
        />
        <label htmlFor="message" className={floatingLabelClass}>Message</label>
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <MagneticButton type="submit" variant="solid" className="w-full mt-2" disabled={sending}>
        {sending ? (
          <>
            <PiSpinnerBold className="animate-spin-slow text-lg" /> Sending...
          </>
        ) : (
          'Send Message'
        )}
      </MagneticButton>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-xl border border-pink/30 bg-pink/10 px-4 py-3 text-sm text-pink-light"
          >
            <PiCheckCircleBold className="text-xl flex-shrink-0" />
            Thank you! Your message has been sent — we'll get back to you soon.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-xl border border-pink-deep/40 bg-pink-deep/10 px-4 py-3 text-sm text-pink-light"
          >
            <PiWarningCircleBold className="text-xl flex-shrink-0" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  )
}
