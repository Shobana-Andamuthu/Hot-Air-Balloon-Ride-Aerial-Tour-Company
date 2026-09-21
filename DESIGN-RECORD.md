# DESIGN RECORD — TEMPLATE 5: AEROVA

## Business Profile
* **Business:** Hot Air Balloon Ride & Aerial Tour Company
* **Brand Name:** AEROVA
* **Tagline:** Aerial Journeys & Sunrise Hot Air Balloon Adventures
* **Target Audience:** Couples, adventure travelers, families, photographers, milestone celebration guests.

## Visual Theme: "Sky Horizon"
* **Primary (Sky Blue):** `#5B9BD5`
* **Secondary / Accent (Sunrise Coral):** `#E87561`
* **Dark (Deep Navy):** `#172B4D`
* **Background (Cloud White):** `#F7FAFC`
* **Surface:** `#FFFFFF`
* **Warm Accent (Warm Sand):** `#E8D7B5`
* **Muted Text:** `#475569` (Light Mode) / `#94A3B8` (Dark Mode)

## Page & Section Architecture
* **Navbar Dropdown:** `Home` holding `Home 1` (`index.html`) & `Home 2` (`home-2.html`).
* **6 Main Public Pages:** Home (`index.html` & `home-2.html`), Flights & Packages (`packages.html`), Experiences (`experiences.html`), Weather & Safety (`weather.html`), Gallery (`gallery.html`), About (`about.html`).
* **3 Functional System Pages:** Login (`login.html`), Register (`register.html`), Customer Dashboard (`dashboard.html`).
* **Exact Section Count:** 7 sections per page (Home 1, Home 2 & all inner public pages: Hero + 5 content sections + Footer).

## Homepage Concepts
* **Home 1 (Cinematic):** Atmospheric aerial hero, 4-card experience grid, asymmetric split flight highlights, signature package grid, 4-step guest flight journey timeline, guest reviews, final booking CTA.
* **Home 2 (Bento & Split):** Split-screen hero with instant flight date reservation widget, asymmetric bento experience showcase, live wind speed & weather radar widget, floating package collections, pilot crew spotlight, guest review carousel.

## Design Highlights
* **Section Background Watermarks:** Low-opacity, high-contrast atmospheric background image overlays with glassmorphism blur cards (`bg-watermark-section` & `bg-watermark-overlay`).
* **Zero Image Repetition:** Every single image across all 10 pages is 100% unique.
* **Accessibility & Contrast:** High contrast text validation in Light & Dark modes, full LTR/RTL support via `document.documentElement.dir`.
