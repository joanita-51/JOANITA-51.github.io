# Portfolio Redesign Plan

## Top-Level Overview

**Goal:** Repair and modernise the `JOANITA-51.github.io` single-page portfolio without altering
any factual content. The site must remain a static GitHub Pages website with no build tooling,
no framework, and no backend.

**Scope:**
- Fix all broken HTML structure, invalid nesting, and semantic issues.
- Consolidate dependencies (remove duplicate Font Awesome, remove unused Bootstrap files,
  replace Owl Carousel + jQuery with a vanilla-JS scroll-snap carousel).
- Rename/remove unsafe or dead asset files.
- Fix all broken links, the contact form, and the CV link.
- Add accessibility attributes and responsive-layout fixes.
- Add SEO and social-sharing metadata.

**Out of scope:**
- Adding new professional experience, projects, qualifications, or any invented content.
- Exposing master's thesis research details (embargoed until 2027).
- Introducing React, Vue, Angular, Astro, npm, a build process, or any backend.

**Branch:** All changes land on `portfolio-redesign`. Master is untouched until a PR merge.

**Confirmed decisions:**
- Font Awesome: keep only the existing FA Kit URL (`kit.fontawesome.com`).
- Carousel: replace Owl Carousel + jQuery with a vanilla-JS + CSS scroll-snap carousel.
- Mentorship link: replace dead Heroku URL with a GitHub repository link.
- Profile photo: rename `0771973013y.jpg` → `profile.jpg`.
- Contact form: inline "Thank you" message via formsubmit.co AJAX mode.
- CV link: change to Google Doc `/preview` mode URL.

---

## Sub-Task 1 — Repository Hygiene

**Status:** [ ] pending

### Intent
Flatten the asset folder structure, rename unsafe/non-standard filenames, remove dead and
redundant files, and add a `.gitignore`. This makes later sub-tasks cleaner and removes
privacy-sensitive filenames from the public URL space.

### Expected Outcomes
- Assets live under `assets/css/`, `assets/js/`, `assets/images/`.
- The stylesheet is named `style.css` (no space in filename).
- The profile photo is named `profile.jpg`.
- Only the Bootstrap files actually used are present.
- A `.gitignore` ignores `.DS_Store` and common OS junk.
- `myprofile.js` (empty file) is deleted.
- Unreferenced images (`facebook.jpg`, `figma-682083.png`, `fintech.png`,
  `my-image2.jpg`, `myimage.jpg`) are deleted.
- `.DS_Store` is deleted and added to `.gitignore`.

### Todo List
1. Create `/assets/css/`, `/assets/js/`, `/assets/images/` directories.
2. Move `bootstrap/css/bootstrap.min.css` → `assets/css/bootstrap.min.css`.
3. Move `bootstrap/css/custom style.css` → `assets/css/style.css`.
4. Move `bootstrap/js/bootstrap.bundle.min.js` → `assets/js/bootstrap.bundle.min.js`.
5. Create `assets/js/main.js` (empty placeholder; populated in Sub-Task 4).
6. Move all images from `bootstrap/media/images/` → `assets/images/`, renaming:
   - `0771973013y.jpg` → `profile.jpg`
   - `Mr.David W.jpg` → `mr-david-w.jpg`
   - `Halimah B.jpg` → `halimah-b.jpg`
   - `Desire.jpg` → `desire.jpg`
   - `mentorship.JPG` → `mentorship.jpg`
   - All other filenames kept (already lowercase/safe).
7. Delete unreferenced images: `facebook.jpg`, `figma-682083.png`, `fintech.png`,
   `my-image2.jpg`, `myimage.jpg`.
8. Delete `bootstrap/media/.DS_Store`.
9. Delete `bootstrap/js/myprofile.js` (empty, unused).
10. Delete the entire `bootstrap/` directory once all used files have been moved.
11. Create `.gitignore` with entries for `.DS_Store`, `Thumbs.db`, `.vscode/`.

### Relevant Context
- Current asset root: `JOANITA-51.github.io/bootstrap/`
- Only these files are referenced in `index.html`:
  - `bootstrap/css/bootstrap.min.css`
  - `bootstrap/css/custom style.css`
  - `bootstrap/js/popper.min.js` (to be removed — bundled in bootstrap.bundle.min.js)
  - `bootstrap/js/bootstrap.bundle.min.js`
  - `bootstrap/media/images/*` (various images)
- `popper.min.js` is already bundled inside `bootstrap.bundle.min.js` — do not move it.

---

## Sub-Task 2 — HTML Skeleton Rewrite

**Status:** [ ] pending

### Intent
Rewrite `index.html` with correct semantic HTML5 structure, fixing all broken nesting,
restoring proper heading hierarchy, adding landmark roles, and preserving every piece of
existing content verbatim.

### Expected Outcomes
- Valid HTML5 that passes W3C validation with no errors.
- Correct heading hierarchy: one `<h1>` in the hero, `<h2>` for section titles,
  `<h3>` for sub-headings within sections.
- A `<main>` element wrapping all content sections.
- Every `<section>` has an `aria-labelledby` pointing to its heading.
- No `<button>` inside `<a>` or `<a>` inside `<button>`.
- No orphaned closing tags.
- `<footer>` is a direct child of `<body>` (not wrapped in `<section>`).
- Copyright line is inside `<footer>`.
- A skip-navigation `<a href="#main-content">Skip to content</a>` link is the first
  element inside `<body>`.
- Navbar `fixed-top` is accompanied by sufficient `padding-top` on `<main>` so anchors
  are not obscured.
- Updated asset paths to match the new `assets/` structure from Sub-Task 1.

### Todo List
1. Add `<a class="skip-nav" href="#main-content">Skip to content</a>` as first child of `<body>`.
2. Change hero `<h2 class="fs-1">` to `<h1>`.
3. Change hero `<h5 class="fs-3">` to `<p class="hero-subtitle">`.
4. Add `id="main-content"` and `<main>` wrapper around all sections.
5. Add `aria-labelledby="about-heading"` to `#Advantage` section; add `id="about-heading"`
   to its `<h2>`.
6. Add `aria-labelledby="work-heading"` to `#work` section; add `id="work-heading"` to its `<h2>`.
7. Add `aria-labelledby="testimonials-heading"` to `#testimonials` section; add
   `id="testimonials-heading"` to its `<h2>`.
8. Add `aria-labelledby="contact-heading"` to `#contactForm` section (moved out of footer
   in the new structure — see note below).
9. Replace `<button><a>` pattern in About section with `<a class="btn btn-light">` directly.
10. Move `<section id="contactForm">` out of `<footer>` and into `<main>` as its own section
    before the footer, keeping all form fields intact.
11. Wrap `<footer>` directly in `<body>` (remove the outer `<section>` wrapper).
12. Move copyright `<div>` inside `<footer>`.
13. Fix the Figma `<a>` tag (line 181) — the icon must be inside the anchor element.
14. Remove stray orphan `</a>` on line 183.
15. Update all asset paths (`bootstrap/css/` → `assets/css/`, etc.).
16. Remove the `<script src="bootstrap/js/popper.min.js">` line.
17. Remove the Font Awesome 4.7 CDN `<link>` (line 16) — keep only the FA Kit `<script>`.
18. Add `padding-top: 70px` (or equivalent) to `<main>` in CSS to clear the fixed navbar.

### Relevant Context
- Source file: `JOANITA-51.github.io/index.html`
- Contact form currently lives inside `<footer>` inside `<section>` — semantically wrong;
  a contact section should be a peer of other content sections.
- The Google Doc CV link must be changed from `…edit?usp=sharing` to `…preview` (Decision 6).
- The Mentorship "website" button must link to a GitHub repo URL (Decision 3) —
  the user will provide the GitHub repo URL; add a placeholder `TODO_MENTORSHIP_GITHUB_URL`
  and flag it in a HTML comment.

---

## Sub-Task 3 — CSS Consolidation

**Status:** [ ] pending

### Intent
Clean up `assets/css/style.css`: fix invalid property values, remove rules for deleted
elements, add a hero text overlay for contrast, fix the responsive About image, and add a
skip-nav rule. Remove the inline `<style>` block from `index.html` into the stylesheet.

### Expected Outcomes
- No invalid CSS values (`font-weight: 600px` → `font-weight: 600`).
- `.banner-image` rule moved from inline `<style>` in HTML into `style.css`.
- A semi-transparent overlay on `.banner-image` so white hero text is always legible.
- About section profile image uses `max-width: 280px; width: 100%; float: left`
  (responsive, not a hard 30% HTML attribute).
- `.card { height: 550px }` replaced with `min-height` or removed (cards expand to content).
- Responsive footer columns use `col-12 col-md-*` patterns (handled in HTML from Sub-Task 2).
- Dead rules for `#github`, `#mentorship`, `#figma`, `#club`, `#more`, `#skils` cleaned up
  if those IDs no longer exist in the new HTML.
- Skip-nav link styled (visually hidden by default, visible on focus).
- `main { padding-top: 70px }` added to clear fixed navbar.

### Todo List
1. Fix `font-weight: 600px` → `font-weight: 600` (line 27 of current CSS).
2. Fix `font-weight: 700px` → `font-weight: 700` (line 37 of current CSS).
3. Move `.banner-image` rule from inline HTML `<style>` into `style.css`, adding:
   ```css
   .banner-image::after {
     content: '';
     position: absolute; inset: 0;
     background: rgba(0,0,0,0.45);
   }
   ```
   so `.banner-image` also gets `position: relative` and hero text sits above the overlay
   via `z-index`.
4. Add `.skip-nav` rule (position absolute, transform off-screen, visible on `:focus`).
5. Add `main { padding-top: 70px }`.
6. Change `.card { height: 550px }` to `min-height: 420px` (prevents overflow on mobile).
7. Fix About image: remove hard `width="30%"` HTML attribute (done in Sub-Task 2),
   add `.about-img { max-width: 280px; width: 100%; float: left; margin: 0 1.5rem 1rem 0 }`.
8. Remove dead rules for IDs that no longer exist.
9. Remove commented-out CSS blocks (`.main`, `#row`, `svg`).

### Relevant Context
- Source file: `JOANITA-51.github.io/bootstrap/css/custom style.css` (will be at
  `assets/css/style.css` after Sub-Task 1).
- The hero banner is a CSS background image — the overlay technique uses a `::after`
  pseudo-element so no new HTML element is needed.

---

## Sub-Task 4 — Dependency Cleanup & Carousel Replacement

**Status:** [ ] pending

### Intent
Remove Owl Carousel, jQuery, and the redundant `popper.min.js` script tags from `index.html`.
Write a ~40-line vanilla-JS + CSS scroll-snap carousel in `assets/js/main.js`. Keep the
scroll-triggered navbar background logic in the same file.

### Expected Outcomes
- No jQuery loaded anywhere.
- No Owl Carousel CSS or JS loaded.
- No `popper.min.js` script tag (already removed in Sub-Task 2).
- `assets/js/main.js` contains:
  1. Scroll listener that adds/removes `bg-dark shadow` on the navbar.
  2. Scroll-snap carousel logic: prev/next buttons move the carousel track by one card width;
     dots update to reflect the active card.
- Testimonials HTML updated to use the new carousel markup (a scrollable `<ul>` or `<div>`
  with `scroll-snap-type: x mandatory` and individual cards as `scroll-snap-align: start`).
- Carousel is keyboard-navigable (prev/next buttons are `<button>` elements with
  `aria-label`).
- CSS for the carousel lives in `style.css`.

### Todo List
1. Remove Owl Carousel CSS CDN `<link>` tags (both `owl.carousel.min.css` and
   `owl.theme.default.min.css`) from `index.html`.
2. Remove jQuery CDN `<script>` from `index.html`.
3. Remove Owl Carousel JS CDN `<script>` from `index.html`.
4. Remove inline `<script>` block that initialises `owlCarousel` from `index.html`.
5. Rewrite the testimonials section HTML: replace `.owl-carousel.owl-carousel1` with
   a `.carousel-track` scrollable container; add `.carousel-prev` and `.carousel-next`
   `<button>` elements and a `.carousel-dots` container.
6. Write carousel CSS in `style.css`:
   - `.carousel-wrapper { position: relative; overflow: hidden }`
   - `.carousel-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
     scroll-behavior: smooth; -ms-overflow-style: none; scrollbar-width: none }`
   - `.carousel-track::-webkit-scrollbar { display: none }`
   - `.carousel-track > * { scroll-snap-align: start; flex: 0 0 auto }`
   - Prev/next button positioning.
7. Write carousel JS in `assets/js/main.js`:
   - On prev/next click, scroll track by card width.
   - On scroll (debounced), update active dot.
   - Initialise dots from number of cards.
8. Move the existing navbar scroll listener inline script into `main.js`.
9. Replace both inline `<script>` blocks in `index.html` with
   `<script src="assets/js/main.js" defer></script>`.

### Relevant Context
- Testimonials section: `JOANITA-51.github.io/index.html` lines 195–281.
- Existing carousel init script: `index.html` lines 383–416.
- Existing navbar scroll script: `index.html` lines 371–382.
- The `.active { opacity: 0.5 }` rule in the current CSS is Owl-specific and will be
  removed; the new carousel uses a `.is-active` class only on dots.

---

## Sub-Task 5 — Link & Form Fixes

**Status:** [ ] pending

### Intent
Fix every broken, outdated, or malformed link and repair the contact form so it actually
submits, validates input, and shows an inline success message.

### Expected Outcomes
- Figma icon in Work section is a proper linked `<a>` with the icon inside it.
- Mentorship "website" button links to a GitHub repo (placeholder comment in HTML until
  user provides the URL — see Sub-Task 2).
- Google Doc CV link points to the `/preview` version.
- Contact form `<button>` has no wrapping `<a>` — it is a plain `<button type="submit">`.
- Contact form uses `type="email"` for the email field.
- All form fields have `required` attribute.
- A hidden `_honey` field (honeypot) is added to the form.
- A hidden `_captcha` field set to `false` is added (disables formsubmit.co CAPTCHA
  redirect, since AJAX mode is used instead).
- Form submission is handled via `fetch()` to formsubmit.co's AJAX endpoint.
- On success, form fields are cleared and an inline `<p role="status">Thank you — I'll be
  in touch!</p>` message becomes visible.
- On error, an inline `<p role="alert">Something went wrong…</p>` message is shown.
- Copyright year updated from 2022 to 2024.
- GitHub icon link in Work section has `aria-label="GitHub profile"`.
- Figma icon link in Work section has `aria-label="Figma portfolio"`.

### Todo List
1. Fix Figma `<a>` tag — move the `<i class="fab fa-figma">` inside the `<a>`.
2. Remove stray `</a>` orphan after the Figma icon.
3. Change Mentorship button `href` to `TODO_MENTORSHIP_GITHUB_URL` placeholder
   (HTML comment explains it; already done conceptually in Sub-Task 2).
4. Change CV button `href` from `…edit?usp=sharing` to `…preview`.
5. Remove `<a href="#">` wrapper around the Send `<button>`.
6. Change `<button class="btn … " id="Send">Send</button>` to
   `<button type="submit" class="btn btn-primary mt-2">Send</button>`.
7. Change email `<input type="text">` to `<input type="email">`.
8. Add `required` to `fullname`, `email`, and `message` fields.
9. Add `<input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">`.
10. Add `<input type="hidden" name="_captcha" value="false">`.
11. Remove `action` and `method` attributes from `<form>` (fetch replaces native submit).
12. Add `id="contact-form"` to the form and `id="form-status"` to a new status `<p>`.
13. Write form submission handler in `assets/js/main.js` using `fetch` to
    `https://formsubmit.co/ajax/nakityojoanita51@gmail.com`.
14. Update copyright year to 2024.
15. Add `aria-label="GitHub profile"` to GitHub icon link.
16. Add `aria-label="View Figma portfolio"` to Figma icon link.

### Relevant Context
- Form: `index.html` lines 305–325.
- Figma link: `index.html` lines 181–183.
- formsubmit.co AJAX usage: POST to `https://formsubmit.co/ajax/{email}` with
  `Content-Type: application/json` and `Accept: application/json`.
  Response is `{ success: "true" }` on success.

---

## Sub-Task 6 — Accessibility Pass

**Status:** [ ] pending

### Intent
Ensure the page meets WCAG 2.1 AA for the elements present: add descriptive `alt` text to
all images, add `aria-label` to icon-only links, verify heading hierarchy, and ensure the
skip-nav link (added in Sub-Task 2) works correctly.

### Expected Outcomes
- Every `<img>` has a meaningful non-empty `alt` attribute.
- Every icon-only link has an `aria-label`.
- Heading hierarchy is h1 → h2 → h3 with no skips.
- Skip-nav link is the first focusable element and jumps to `#main-content`.
- Social media links in footer have descriptive `aria-label` values.
- Carousel prev/next buttons have `aria-label="Previous testimonial"` and
  `aria-label="Next testimonial"`.
- Carousel dots have `aria-label="Testimonial N"` and `aria-current="true"` on the active dot.
- Form status message uses `role="status"` (success) and `role="alert"` (error).

### Todo List
1. `hero-image.jpg` is a CSS background (decorative) — the `<h1>` and subtitle carry the
   meaning; no alt needed, but confirm `.banner-image` has `role` handled by content.
2. About image: change `alt=" "` to `alt="Nakityo Joanita"`.
3. Testimonial `kalenda.png`: change `alt="Computer Scientist"` to `alt="Kalenda Racheal"`.
4. Testimonial `mr-david-w.jpg`: change `alt="coach"` to `alt="David Wampamba"`.
5. Testimonial `desire.jpg`: change `alt="-classmate"` to `alt="Desire Awori"`.
6. Testimonial `joan.jpg`: change `alt="-classmate"` to `alt="Joanita Anyango"`.
7. Testimonial `pully.jpg`: change `alt="-classmate"` to `alt="Mary Priscilla Kizza"`.
8. Testimonial `halimah-b.jpg`: change `alt="-classmate"` to `alt="Bukirwa Halimah"`.
9. Add `aria-label="GitHub profile"` to GitHub icon link (duplicate check with Sub-Task 5).
10. Add `aria-label="View Figma portfolio"` to Figma icon link.
11. Add `aria-label="Twitter profile"` to Twitter footer link.
12. Add `aria-label="LinkedIn profile"` to LinkedIn footer link.
13. Add `aria-label="Facebook profile"` to Facebook footer link.
14. Verify heading levels post-rewrite match h1 → h2 → h3 throughout.
15. Confirm skip-nav CSS makes link visible on keyboard focus (from Sub-Task 3).

### Relevant Context
- All image `alt` attributes: `index.html` lines 102, 200, 214, 228, 242, 254, 267.
- Social icon links: `index.html` lines 335–344.

---

## Sub-Task 7 — SEO & Social-Sharing Metadata

**Status:** [ ] pending

### Intent
Add all missing `<head>` metadata so the page has a useful search-engine snippet, a proper
favicon reference, and rich preview cards when shared on LinkedIn, Twitter/X, and Facebook.

### Expected Outcomes
- `<title>` reads: `Nakityo Joanita — Web Developer & Data Scientist`
- `<meta name="description">` is present with a concise factual summary.
- Open Graph tags present: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`.
- Twitter Card tags present: `twitter:card`, `twitter:title`, `twitter:description`,
  `twitter:image`.
- `<link rel="canonical">` points to `https://joanita-51.github.io/`.
- `<link rel="icon">` references `assets/images/logo.svg`.
- No invented content — description is drawn from existing page text only.

### Todo List
1. Update `<title>` to `Nakityo Joanita — Web Developer & Data Scientist`.
2. Add `<meta name="description" content="Nakityo Joanita is a web developer and data
   scientist based in Uganda, with skills in HTML, CSS, JavaScript, the MERN stack, and
   Python data analysis.">`.
3. Add `<meta property="og:title" content="Nakityo Joanita — Web Developer & Data Scientist">`.
4. Add `<meta property="og:description">` (same as meta description).
5. Add `<meta property="og:type" content="website">`.
6. Add `<meta property="og:url" content="https://joanita-51.github.io/">`.
7. Add `<meta property="og:image" content="https://joanita-51.github.io/assets/images/profile.jpg">`.
8. Add `<meta name="twitter:card" content="summary_large_image">`.
9. Add `<meta name="twitter:title">` (same as og:title).
10. Add `<meta name="twitter:description">` (same as og:description).
11. Add `<meta name="twitter:image">` (same as og:image).
12. Add `<link rel="canonical" href="https://joanita-51.github.io/">`.
13. Add `<link rel="icon" href="assets/images/logo.svg" type="image/svg+xml">`.
14. Remove `<meta http-equiv="X-UA-Compatible" content="IE=edge">` (IE11 is EOL, unnecessary).

### Relevant Context
- Current `<head>`: `index.html` lines 1–28.
- The `profile.jpg` (renamed from `0771973013y.jpg`) is the best available image for
  social sharing since it is the about-section portrait.
- `og:image` requires an absolute URL — GitHub Pages URL is `https://joanita-51.github.io/`.

---

## Open Items Requiring User Input

| # | Item | Status |
|---|---|---|
| 1 | Mentorship Club GitHub repository URL | **Needed** — add to Sub-Task 5 Todo step 3 |
| 2 | Schotrix and Alfasente links — confirm still live | Verify before launch |
| 3 | Twitter/X handle — `@nakityojoanita` used in current footer | Confirm still active |
