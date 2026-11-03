import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { nav, site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { useActiveSection } from './motion'

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

/** Intro screen: monogram plus a percentage counter, then fades away. */
export function Loader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1300
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(Math.round((1 - Math.pow(1 - t, 2)) * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 250)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn(
        'loader fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-background transition-all duration-700',
        done && 'pointer-events-none opacity-0 -translate-y-4',
      )}
    >
      <div className="font-mono text-5xl font-bold sm:text-6xl">
        <span className="text-muted-foreground">&lt;</span>
        <span className="text-gradient">{site.monogram}</span>
        <span className="text-muted-foreground">/&gt;</span>
      </div>
      <div className="h-px w-48 overflow-hidden bg-border">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {String(progress).padStart(2, '0')}% · Architecting CRM experiences
      </p>
    </div>
  )
}

const navIds = nav.map((n) => n.id)

export function Header() {
  const active = useActiveSection(navIds)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'glass border-x-0 border-t-0'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className="font-mono text-sm font-semibold sm:text-base"
          onClick={() => setOpen(false)}
        >
          <span className="text-muted-foreground">&lt;</span>
          <span className="text-foreground">{site.shortName}</span>
          <span className="text-muted-foreground"> /&gt;</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={cn(
                'rounded-full px-3.5 py-2 text-sm transition-colors',
                active === item.id
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.resume}
            download
            className="btn-ghost hidden !px-4 !py-2 sm:inline-flex"
          >
            <Download aria-hidden="true" size={15} /> Résumé
          </a>
          <a href="#contact" className="btn-primary !px-5 !py-2">
            Hire Me
          </a>
          <button
            type="button"
            className="ml-1 rounded-full p-2 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t px-5 pb-6 pt-2 lg:hidden"
        >
          <ul className="grid gap-1">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 text-lg hover:bg-secondary"
                >
                  <span className="font-mono text-xs text-accent">
                    0{i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resume}
                download
                className="flex items-center gap-4 rounded-xl px-3 py-3 text-lg hover:bg-secondary"
              >
                <Download
                  aria-hidden="true"
                  size={16}
                  className="text-accent"
                />{' '}
                Download résumé
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#top" className="font-mono text-lg font-semibold">
            <span className="text-muted-foreground">&lt;</span>
            {site.shortName}
            <span className="text-muted-foreground"> /&gt;</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Dynamics 365 CE &amp; Power Platform Technical Lead building
            scalable, secure CRM solutions for enterprises across the globe.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-full border p-2.5 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Navigate
          </h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Contact
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="break-all hover:text-foreground"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="hover:text-foreground">
                {site.phone}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-5 py-6 font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name} · Built with React, TanStack
          Start &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
