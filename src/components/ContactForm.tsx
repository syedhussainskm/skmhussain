
import { useRef, useState, type FormEvent } from 'react'
import { CircleCheck, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'error' | 'success'
  >('idle')

  const formRef = useRef<HTMLFormElement>(null)
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitting.current || status === 'success') return
    if (!formRef.current) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are missing.')
      setStatus('error')
      return
    }

    submitting.current = true
    setStatus('pending')

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        { publicKey }
      )

      formRef.current.reset()
      setStatus('success')
    } catch (error) {
      console.error('EmailJS submission failed:', error)
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-1">
        Send a message
      </h3>

      <p className="text-sm text-muted-foreground mb-7">
        Share a few details about your project and I'll get back to you.
      </p>

      {status === 'success' ? (
        <div className="text-center py-10">
          <CircleCheck
            aria-hidden="true"
            className="w-12 h-12 mx-auto mb-4 text-accent"
          />

          <h2 className="text-2xl font-bold mb-2">
            Message received
          </h2>

          <p role="status" className="mb-6 text-muted-foreground">
            Thanks for reaching out. Your message has been sent successfully.
          </p>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setStatus('idle')}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={submit}
          aria-busy={status === 'pending'}
          className="space-y-6"
        >
          <fieldset
            disabled={status === 'pending'}
            className="min-w-0 space-y-5 disabled:opacity-70"
          >
            <legend className="sr-only">Your message</legend>

            <div>
              <label
                htmlFor="name"
                className="block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
              >
                Name
              </label>

              <input
                id="name"
                name="user_name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                className="contact-input"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="user_email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className="contact-input"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                required
                maxLength={200}
                className="contact-input"
                placeholder="Dynamics 365 implementation, Power Platform..."
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={6}
                className="contact-input"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'pending'}
              className="btn-primary"
            >
              <Send aria-hidden="true" size={16} />

              {status === 'pending' ? 'Sending...' : 'Send message'}
            </button>
          </fieldset>

          <p role="status" className="sr-only">
            {status === 'pending' ? 'Sending your message...' : ''}
          </p>

          {status === 'error' && (
            <p role="alert" className="text-sm text-destructive">
              We couldn't send your message. Please check the EmailJS
              configuration and try again.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
