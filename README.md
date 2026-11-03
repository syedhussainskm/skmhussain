# Khaja Moinuddin Hussain Syed — Portfolio

Personal portfolio of **Khaja Moinuddin Hussain Syed**, Microsoft Dynamics 365 CE Technical Lead and Power Platform expert based in Hyderabad, India.

It's a single-page site with a dark, developer-style look. It has an animated intro, a typewriter hero over an interactive node-network background, an About section with animated stats, tabbed skill categories, an experience timeline, expandable project cards, education, and a working contact form.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR)
- Tailwind CSS v4 with `tailwindcss-animate`
- `lucide-react` icons
- Netlify Forms for contact form submissions
- Hosted on Netlify

## Run locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
# or, with Netlify emulation (forms etc.)
netlify dev
```

Run tests with `pnpm test`.

## Editing content

All text content (profile, skills, jobs, projects, education, and nav) lives in `src/lib/site.ts`. The downloadable résumé is `public/files/Khaja-Moinuddin-Hussain-Syed-Resume.pdf`. Replace that file to update it.

Contact form submissions appear in the Netlify dashboard under **Forms → contact**.
