import { useRef, useState, type FormEvent } from 'react'
import { CircleCheck, Send } from 'lucide-react'

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'error' | 'success'
  >('idle')
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || status === 'success') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) =>
      body.append(key, String(value)),
    )
    submitting.current = true
    setStatus('pending')
    try {
      const response = await fetch('/contact.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Message was not accepted')
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-1">Send a message</h3>
      <p className="text-sm text-muted-foreground mb-7">
        Share a few details about your project and I&apos;ll get back to you.
      </p>
      {status === 'success' ? (
        <div className="text-center py-10">
          <CircleCheck
            aria-hidden="true"
            className="w-12 h-12 mx-auto mb-4 text-accent"
          />
          <h2 className="text-2xl font-bold mb-2">Message received</h2>
          <p role="status" className="mb-6 text-muted-foreground">
            Thanks for reaching out. Your message was accepted.
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
          name="contact"
          method="POST"
          action="/contact.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          aria-busy={status === 'pending'}
          onSubmit={submit}
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Leave this empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
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
                name="name"
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
                name="email"
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
                required
                maxLength={200}
                className="contact-input"
                placeholder="Dynamics 365 implementation, Power Platform…"
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
                placeholder="Tell me about your project…"
              />
            </div>
            <button type="submit" className="btn-primary">
              <Send aria-hidden="true" size={16} />
              {status === 'pending' ? 'Sending…' : 'Send message'}
            </button>
          </fieldset>
          <p role="status" className="sr-only">
            {status === 'pending' ? 'Sending your message…' : ''}
          </p>
          {status === 'error' && (
            <p role="alert" className="text-sm text-destructive">
              We couldn’t confirm your message. Your details are still here;
              please try again. Local previews don’t process submissions.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
