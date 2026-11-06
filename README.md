# Jagadeshwaran K — Developer Portfolio

A responsive developer portfolio built with the Next.js App Router. The page content is kept in semantic HTML, with custom CSS for the visual system, Tailwind CSS for utilities, and Motion for lightweight entrance and scroll animations.

## Features

- Developer-focused portfolio sections for approach, experience, stack, projects, credentials, and contact
- Interactive architecture layer controls and filterable skill cards
- Responsive navigation and a light/dark theme toggle that remembers the selected theme
- Reduced-motion-aware entrance and scroll animations
- Contact links and an email-based contact form
- Separate `/resume` page with full and one-page views, Markdown copy, and print-to-PDF controls
- Search-friendly page structure rendered by Next.js

## Getting started

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Then open [http://localhost:3000].

To create and run a production build:

```sh
npm run build
npm start
```

## Project structure

- `app/` — Next.js layout, page entry point, interactive behavior, and Motion effects
- `content/portfolio.html` — portfolio content and semantic page markup
- `content/resume.html` — resume page content
- `styles.css` — responsive visual design and light/dark theme styles
- `app/globals.css` — Tailwind CSS entry point

Update copy and section markup in `content/portfolio.html`; update presentation in `styles.css`. Interactive controls live in `app/client-enhancements.js`, while scroll and entrance effects live in `app/motion-effects.js`.
