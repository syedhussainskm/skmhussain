import { useState } from 'react'
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Calendar,
  ChartColumn,
  ChevronDown,
  CodeXml,
  Compass,
  Download,
  GitBranch,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  about,
  education,
  education1,
  jobs,
  projects,
  site,
  skillGroups,
  toolbox,
} from '@/lib/site'
import { cn } from '@/lib/utils'
import { ContactForm } from '../ContactForm'
import { LinkedInIcon } from './Chrome'
import { CountUp, Reveal, SectionHeading, useTypewriter } from './motion'
import { NetworkCanvas } from './NetworkCanvas'

const icons: Record<string, LucideIcon> = {
  layers: Layers,
  zap: Zap,
  code: CodeXml,
  shield: ShieldCheck,
  compass: Compass,
  git: GitBranch,
  chart: ChartColumn,
  calendar: Calendar,
  rocket: Rocket,
  users: Users,
}

/* ------------------------------------------------------------------ Hero */

export function Hero() {
  const typed = useTypewriter(site.roles)
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent/15 blur-[120px]"
      />
      <NetworkCanvas />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <Reveal>
            <p className="chip mb-7 gap-2 !text-foreground">
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
              {site.currentRole}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mb-3 font-mono text-sm text-muted-foreground">
              // Hello, I&apos;m
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Khaja Moinuddin
              <br />
              <span className="text-gradient">Hussain Syed</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 min-h-[2.2em] font-mono text-lg text-foreground sm:text-2xl">
              <span className="text-muted-foreground">I am a </span>
              <span className="text-accent">{typed}</span>
              <span className="caret" aria-hidden="true" />
              <span className="sr-only">{site.roles.join(', ')}</span>
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.tagline}
            </p>
          </Reveal>
          <Reveal delay={400} className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View my work <ArrowUpRight aria-hidden="true" size={16} />
            </a>
            <a href={site.resume} download className="btn-ghost">
              <Download aria-hidden="true" size={16} /> Download résumé
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="btn-ghost !px-4"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={300} className="hidden lg:block">
          <CodeCard />
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
      >
        Scroll
        <ChevronDown aria-hidden="true" size={16} className="float-slow" />
      </a>
    </section>
  )
}

function CodeCard() {
  const line = (n: number, content: React.ReactNode) => (
    <div className="flex gap-4">
      <span className="w-4 select-none text-right text-muted-foreground/40">
        {n}
      </span>
      <span>{content}</span>
    </div>
  )
  const k = (s: string) => <span className="text-[#c792ea]">{s}</span>
  const t = (s: string) => <span className="text-primary">{s}</span>
  const str = (s: string) => <span className="text-accent">{s}</span>
  return (
    <div className="float-slow glass card-glow rounded-2xl shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">
          LeadPlugin.cs
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 text-foreground/90">
        {line(
          1,
          <>
            {k('public class')} {t('TechnicalLead')} : {t('IPlugin')}
          </>,
        )}
        {line(2, '{')}
        {line(
          3,
          <>
            &nbsp;&nbsp;{k('string')} Name = {str('"Khaja Hussain"')};
          </>,
        )}
        {line(
          4,
          <>
            &nbsp;&nbsp;{k('int')} YearsOfExperience ={' '}
            <span className="text-[#f78c6c]">8</span>;
          </>,
        )}
        {line(
          5,
          <>
            &nbsp;&nbsp;{k('string')}[] Stack = {'{'}
          </>,
        )}
        {line(
          6,
          <>
            &nbsp;&nbsp;&nbsp;&nbsp;{str('"Dynamics 365 CE"')},{' '}
            {str('"Dataverse"')},
          </>,
        )}
        {line(
          7,
          <>
            &nbsp;&nbsp;&nbsp;&nbsp;{str('"Power Platform"')}, {str('"PCF"')},{' '}
            {str('"Azure"')}
          </>,
        )}
        {line(8, <>&nbsp;&nbsp;{'};'}</>)}
        {line(
          9,
          <>
            &nbsp;&nbsp;{k('public void')} {t('Execute')}(Requirement req) =&gt;
          </>,
        )}
        {line(
          10,
          <>&nbsp;&nbsp;&nbsp;&nbsp;Deliver(Scalable &amp;&amp; Secure);</>,
        )}
        {line(11, '}')}
      </pre>
    </div>
  )
}

/* ----------------------------------------------------------------- About */

export function About() {
  const facts: { icon: LucideIcon; label: string; value: React.ReactNode }[] = [
    { icon: MapPin, label: 'Location', value: site.location },
    { icon: Briefcase, label: 'Experience', value: '8+ years' },
    { icon: Layers, label: 'Specialty', value: site.specialty },
    {
      icon: Mail,
      label: 'Email',
      value: (
        <a
          href={`mailto:${site.email}`}
          className="break-all hover:text-accent"
        >
          {site.email}
        </a>
      ),
    },
  ]
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="01"
          label="About me"
          title={
            <>
              Turning complex business needs into{' '}
              <span className="text-gradient">elegant CRM solutions</span>
            </>
          }
        />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <div className="glass card-glow rounded-2xl p-7">
              <div className="mb-6 flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent font-mono text-xl font-bold text-primary-foreground">
                  {site.monogram}
                </div>
                <div>
                  <p className="font-semibold">{site.shortName}</p>
                  <p className="text-sm text-muted-foreground">
                    D365 CE Technical Lead
                  </p>
                </div>
              </div>
              <dl className="space-y-4">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon
                      aria-hidden="true"
                      size={18}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <div className="min-w-0">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="text-sm text-foreground">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent">
                <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
                Open to new opportunities
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {about.stats.map((stat, i) => {
            const Icon = icons[stat.icon]
            return (
              <Reveal key={stat.label} delay={i * 90}>
                <div className="glass card-glow h-full rounded-2xl p-6">
                  <Icon
                    aria-hidden="true"
                    size={20}
                    className="mb-5 text-primary"
                  />
                  <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Skills */

export function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id)
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0]
  const ActiveIcon = icons[active.icon]

  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="02"
          label="Skills"
          title={
            <>
              A full-stack <span className="text-gradient">Power Platform</span>{' '}
              toolkit
            </>
          }
          intro="From low-code apps to pro-code plugins and Azure integrations — the capabilities I bring to every engagement."
        />

        <Reveal>
          <div
            role="tablist"
            aria-label="Skill categories"
            className="mb-8 flex flex-wrap gap-2"
          >
            {skillGroups.map((group) => {
              const Icon = icons[group.icon]
              const selected = group.id === activeId
              return (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  id={`tab-${group.id}`}
                  aria-selected={selected}
                  aria-controls="skills-panel"
                  onClick={() => setActiveId(group.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all',
                    selected
                      ? 'border-transparent bg-gradient-to-r from-primary to-accent font-semibold text-primary-foreground'
                      : 'text-muted-foreground hover:border-accent/60 hover:text-foreground',
                  )}
                >
                  <Icon aria-hidden="true" size={15} />
                  {group.title}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className="glass rounded-3xl p-6 sm:p-10"
        >
          <div
            key={active.id}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
                <ActiveIcon aria-hidden="true" size={22} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{active.title}</h3>
                <p className="text-sm text-muted-foreground">{active.blurb}</p>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {active.skills.map((skill, i) => (
                <li
                  key={skill}
                  className="group flex items-center gap-3 rounded-xl border bg-secondary/40 px-4 py-3.5 text-sm transition-colors hover:border-accent/50 animate-in fade-in slide-in-from-bottom-1 fill-mode-both"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <span className="font-mono text-xs text-accent/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-foreground/90 group-hover:text-foreground">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="marquee mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Technologies I work with
          </p>
          <div className="marquee-track flex w-max gap-3">
            {[...toolbox, ...toolbox].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                aria-hidden={i >= toolbox.length ? 'true' : undefined}
                className="whitespace-nowrap rounded-xl border bg-card px-5 py-3 font-mono text-sm text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ Experience */

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="03"
          label="Experience"
          title={
            <>
              8+ years shipping{' '}
              <span className="text-gradient">enterprise CRM</span>
            </>
          }
          intro="Roles spanning consulting, delivery management and technical leadership."
        />
        <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-10">
          {jobs.map((job, i) => (
            <li key={job.company} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute -left-[31px] top-7 h-3.5 w-3.5 rounded-full border-2 border-background sm:-left-[47px]',
                  job.current ? 'pulse-dot bg-accent' : 'bg-primary',
                )}
              />
              <Reveal delay={i * 60}>
                <article className="glass card-glow rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold sm:text-xl">
                        {job.title}
                      </h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 text-primary">
                          <Building2 aria-hidden="true" size={14} />{' '}
                          {job.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin aria-hidden="true" size={14} /> {job.location}
                        </span>
                      </p>
                    </div>
                    <span
                      className={cn(
                        'chip',
                        job.current && '!border-accent/40 !text-accent',
                      )}
                    >
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent/70"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- Projects */

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="04"
          label="Projects"
          title={
            <>
              Selected <span className="text-gradient">client engagements</span>
            </>
          }
          intro="Enterprise solutions delivered for nonprofits, global technology leaders and international banks."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => {
            const open = openIndex === i
            return (
              <Reveal
                key={`${project.client}-${project.title}`}
                delay={(i % 2) * 100}
              >
                <article className="glass card-glow group flex h-full flex-col rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-mono text-sm text-muted-foreground">
                      {String(i + 1).padStart(2, '0')}
                      <span className="mx-2 text-border">/</span>
                      <span className="text-accent">{project.category}</span>
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border text-muted-foreground transition-all group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
                      <ArrowUpRight aria-hidden="true" size={16} />
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-primary">
                      <Building2 aria-hidden="true" size={14} />{' '}
                      {project.client}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Calendar aria-hidden="true" size={14} /> {project.period}
                    </span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {project.summary}
                  </p>

                  {open && (
                    <ul
                      id={`project-${i}`}
                      className="mt-5 space-y-2 border-t pt-5 text-sm leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-top-1"
                    >
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`project-${i}`}
                      className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-accent hover:text-foreground"
                    >
                      {open ? 'Hide details' : 'Key contributions'}
                      <ChevronDown
                        aria-hidden="true"
                        size={14}
                        className={cn(
                          'transition-transform',
                          open && 'rotate-180',
                        )}
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Education */

export function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="05"
          label="Education"
          title={
            <>
              Academic <span className="text-gradient">background</span>
            </>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item) => (
            <Reveal key={item.degree}>
              <article className="glass card-glow flex gap-5 rounded-2xl p-7">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <GraduationCap aria-hidden="true" size={26} />
                </div>
                <div>
                  <span className="chip mb-3">{item.period}</span>
                  <h3 className="text-lg font-semibold">{item.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.school} · {item.location}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
          {education1.map((item) => (
            <Reveal key={item.degree}>
              <article className="glass card-glow flex gap-5 rounded-2xl p-7">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <GraduationCap aria-hidden="true" size={26} />
                </div>
                <div>
                  <span className="chip mb-3">{item.period}</span>
                  <h3 className="text-lg font-semibold">{item.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.school} · {item.location}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal delay={100}>
            <article className="glass card-glow flex gap-5 rounded-2xl p-7">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <Rocket aria-hidden="true" size={24} />
              </div>
              <div>
                <span className="chip mb-3">2018 — Present</span>
                <h3 className="text-lg font-semibold">
                  Continuous professional learning
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  8+ years of hands-on growth across the Microsoft Dynamics 365,
                  Power Platform and Azure ecosystem on enterprise projects.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Contact */

export function Contact() {
  const channels: {
    icon: React.ElementType
    label: string
    value: string
    href: string
    external?: boolean
  }[] = [
    {
      icon: Mail,
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
    },
    { icon: Phone, label: 'Phone', value: site.phone, href: site.phoneHref },
    {
      icon: LinkedInIcon,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: site.linkedin,
      external: true,
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'skmhussain.vercel.app',
      href: site.website,
      external: true,
    },
  ]
  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          index="06"
          label="Contact"
          title={
            <>
              Let&apos;s build your next{' '}
              <span className="text-gradient">CRM success story</span>
            </>
          }
          intro="Planning a Dynamics 365 implementation, a Power Platform rollout or an Azure integration? I'd love to hear about it."
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {channels.map(({ icon: Icon, label, value, href, external }, i) => (
              <Reveal key={label} delay={i * 70}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="glass card-glow group flex items-center gap-4 rounded-2xl p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-foreground">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    className="ml-auto shrink-0 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-accent"
                  />
                </a>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <pre className="glass overflow-x-auto rounded-2xl p-5 font-mono text-[13px] leading-6 text-muted-foreground">
                <span className="text-[#c792ea]">const</span> next ={' '}
                <span className="text-accent">&apos;collaborate&apos;</span>;
                {'\n'}
                <span className="text-muted-foreground/60">
                  // based in {site.location}, working remotely worldwide
                </span>
              </pre>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="glass rounded-3xl p-6 sm:p-9">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
