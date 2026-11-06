# My change notes

This file records what changed in the portfolio and why, in plain language. The professional project overview and setup steps are in `README.md`.

## How the portfolio was reshaped

1. **Switched the design reference to Hallmark Vantage.** The layout was reworked around an engineering point of view: layer labels, an architecture map, compact capability summaries, and work presented as a technical record. The reference supplied the visual direction; the content was adapted to Jagadeshwaran’s developer experience.
2. **Changed the section language for a developer portfolio.** The navigation and headings now use terms such as Approach, Experience, Stack, Builds, Credentials, and Contact. The hero introduces the portfolio as software engineering work.
3. **Built an interactive hero architecture map.** The diagram connects the interface, services, commerce platforms, delivery, and data areas. Its layer controls hide or show their related diagram nodes and connections.
4. **Made the skills area filterable.** The skill cards can be filtered by interface, systems, and platforms. The count updates to show how many cards are visible.
5. **Added motion and interaction.** The page has hero entrance motion, scroll reveals, hover feedback, mobile navigation, expandable project and credential details, and the layer controls. Motion respects the browser’s reduced-motion preference.
6. **Kept content in HTML and moved the app to Next.js.** The visible portfolio markup lives in `content/portfolio.html`; Next.js renders it from the App Router page. Tailwind CSS is available for utility styling, custom visual rules live in `styles.css`, and Motion handles animation.

## Theme and refresh fixes

7. **Added persistent light and dark themes.** The selected theme is stored in `localStorage`; when no saved choice exists, the site follows the system preference.
8. **Adjusted dark-mode contrast.** The “Let’s talk” call to action and the skill layer controls received dark-specific colors so their labels remain readable.
9. **Reduced the theme flash on refresh.** The pre-hydration script applies the saved theme before React hydrates. The body’s color transition is enabled only after the theme bootstrap completes. Theme colors were also aligned with the page palette.
10. **Fixed the CSS font import order.** A Google Fonts `@import` inside the custom stylesheet was being processed after Tailwind-generated rules, causing a CSS parser error. The import was removed from `styles.css`; all three fonts are now linked from the document head in `app/layout.js`.

## Wordmark changes and current state

11. **Tried the supplied `J.png` as a logo.** The image was copied to `public/J.png` and used in the header and footer. On request, this logo change was undone and the image file was deleted.
12. **Removed the square letter block.** The text wordmark was restored without a square background. It was briefly removed from both ends of the page, then restored after the undo request.
13. **Current wordmark:** `JAGADESHWARAN K` appears as text in the header and footer. There is no separate square “J” block or PNG logo. The hero eyebrow also includes the name as part of the role label.

## Page refresh behavior for edited content

14. **Made portfolio HTML load during each page render.** `app/page.js` previously read `content/portfolio.html` once at module load. That made edits to the HTML file potentially remain stale until the page module reloaded. It now uses Next.js `force-dynamic` rendering and reads the HTML inside the page function, so refreshes pick up the current content.
15. **Checked the wordmark source after the duplicate-J report.** The current header and footer text each contain only one initial J: `JAGADESHWARAN K`. No separate J icon is present.

## Build and verification notes

- JavaScript syntax checks passed for the page and interactive scripts during these changes. The CSS brace count and in-page anchor links were also checked.
- `npm run build` was attempted after the CSS import fix. CSS parsing proceeded, but the build stopped when Turbopack could not bind to a port in the environment (`Operation not permitted`). A full production build was therefore not confirmed.
- The site was not visually rechecked in a browser after the last wordmark edits.

## Main files

- `app/page.js` — loads the portfolio HTML during page rendering
- `app/layout.js` — metadata, font links, and early theme setup
- `app/client-enhancements.js` — theme, navigation, layer controls, skill filtering, and other browser interactions
- `app/motion-effects.js` — entrance and scroll animation behavior
- `app/globals.css` — Tailwind CSS import
- `content/portfolio.html` — all page copy and section markup
- `styles.css` — page layout, responsive rules, and theme styles
