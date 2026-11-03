import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

/** Fades/slides its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)
  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

export function useInView(
  ref: React.RefObject<Element | null>,
  rootMargin = '0px 0px -10% 0px',
) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin, inView])
  return inView
}

/** Counts from 0 to `value` once visible. */
export function CountUp({
  value,
  suffix = '',
  duration = 1600,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(Math.round(eased * value))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {current}
      {suffix}
    </span>
  )
}

/** Types and deletes each phrase in turn. */
export function useTypewriter(words: string[], speed = 70, pause = 1600) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else {
      timeout = setTimeout(
        () =>
          setText(
            deleting
              ? word.slice(0, text.length - 1)
              : word.slice(0, text.length + 1),
          ),
        deleting ? speed / 2 : speed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, speed, pause])

  return text
}

/** Tracks which section id is currently in the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])
  return active
}

export function SectionHeading({
  index,
  label,
  title,
  intro,
}: {
  index: string
  label: string
  title: ReactNode
  intro?: string
}) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p className="mb-4 flex items-center gap-3 font-mono text-sm text-accent">
        <span>{index}</span>
        <span className="h-px w-10 bg-accent/60" />
        <span className="uppercase tracking-[0.2em]">{label}</span>
      </p>
      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  )
}
