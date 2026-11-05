# AGENTS.md

Single-page personal portfolio for Khaja Moinuddin Hussain Syed (Dynamics 365 CE / Power Platform Technical Lead). TanStack Start + React 19 + Tailwind v4, deployed on Netlify.

## Layout

- `src/lib/site.ts`: **the only content source.** It holds identity, contact links, typewriter roles, about text and stats, skill groups, the toolbox marquee, jobs, projects, education, and nav. Update content here, not in components.
- `src/routes/index.tsx`: composes the page: Loader, Header, Hero, About, Skills, Experience, Projects, Education, Contact, Footer.
- `src/routes/index.tsx`: composes the page: Loader, Header, VideoIntro, Hero, About, Skills, Experience, Projects, Education, Contact, Footer.
- `src/routes/__root.tsx`: HTML shell, meta tags, Google Fonts (Sora + JetBrains Mono), and the SVG favicon.
- `src/components/portfolio/Chrome.tsx`: the intro Loader, the sticky Header (active-section highlighting and mobile menu), the Footer, and the inline LinkedIn icon. lucide-react v1 has no brand icons.
- `src/components/portfolio/Sections.tsx`: all page sections.
- `src/components/portfolio/motion.tsx`: `Reveal` (scroll-in animation), `CountUp`, `useTypewriter`, `useActiveSection`, and `SectionHeading`.
- `src/components/portfolio/VideoIntro.tsx`: the full-screen intro video (`site.introVideo`, served from `public/videos/intro.mp4`) with play/pause, sound toggle and typed `introTopics`. It renders nothing if the file is missing.
- `src/components/portfolio/NetworkCanvas.tsx`: the canvas node-network hero background. It respects `prefers-reduced-motion`.
- `src/components/ContactForm.tsx` and `public/contact.html`: the Netlify Forms contact form, which POSTs via AJAX to `/contact.html`. The static file registers the form at deploy time. **Field names must match in both files.** `ContactForm.test.tsx` enforces this.
- `src/styles.css`: theme tokens (dark ink with azure `--primary` and mint `--accent`) plus shared classes: `glass`, `card-glow`, `btn-primary`, `btn-ghost`, `chip`, `contact-input`, `reveal`, and the marquee/caret/pulse animations.
- `public/files/`: the downloadable résumé PDF.

## Conventions

- Section ids in `nav` (site.ts) must match the `id` attributes of the sections. Section headings are numbered 01–06 in page order.
- Use theme tokens (`text-muted-foreground`, `bg-secondary`, `text-accent`, …), not raw grays.
- Animations must degrade under `prefers-reduced-motion`. The loader has a CSS fallback that hides it after 3s even without JS.
- Keep content faithful to the owner's résumé. Don't invent metrics or projects.
