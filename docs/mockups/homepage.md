# Homepage Mockup

**Tagline:** Where your weekends come alive.

![Homepage Mockup](homepage.png)

---

## Purpose

Convert curious visitors into early users by quickly conveying BloomTrip's differentiated weekend-focused, context-aware planning value.

## Included Sections

1. Hero: Tagline + supporting copy emphasizing personalized weekend trip suggestions (interests, season, weather).
1. Signup Form: Single email capture prominently below hero text.
1. Trip Preview Carousel (teaser): Rotating sample trip cards (weekend escapes) to hint personalization depth.
1. Feature Highlights (three columns):

  * Discover hidden gems
  * Stay in the know
  * Plan with ease

1. Primary CTA Footer Bar: "Start your next adventure today"

## Content Copy (Draft)

Hero Lead: Where your weekends come alive.
Supporting: Forget endless planning. Get personalized weekend trip suggestions based on your interests, the season, and live weather.
CTA Button (hero + footer): Start your next adventure today
Feature 1: Discover hidden gems — Explore curated destinations tailored to your profile and preferences.
Feature 2: Stay in the know — We factor in live weather updates to ensure your trips are always timely.
Feature 3: Plan with ease — Receive ready‑to‑go itineraries that include maps, activities, and events.

## Design Notes

* Palette: Fresh green (primary action), sky blue (brand accent), warm coral (secondary CTA/emphasis)
* Typography: Poppins or Nunito (semi-rounded, approachable, high legibility)
* Imagery: Nature, camper vans, trails, seasonal landscapes (avoid stock overly staged scenes)
* Layout: Two-column hero (text + visual) collapsing to stacked on mobile
* Grid: 12-column desktop, 6-column tablet, single-column mobile
* Spacing: 8px base unit with 4x (32px) rhythm for section separation
* Buttons: Rounded medium radius, subtle elevation (shadow 2dp), accessible contrast (WCAG AA+)

## Accessibility

* Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large headings
* Form input labeled and associated with description
* Keyboard focus outlines preserved
* Alt text for primary imagery and feature icons

## Responsive Behavior

* Carousel hides on very small viewports (<360px) replaced by static sample cards
* Feature grid collapses 3 → 2 → 1 columns
* Footer CTA becomes sticky on mobile scroll (optional experiment)

## Implementation Guidance (React Example Skeleton)

```tsx
import React from 'react';

export const Homepage: React.FC = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__text">
          <h1>Where your weekends come alive.</h1>
          <p>Forget endless planning. Get personalized weekend trip suggestions based on your interests, the season, and live weather.</p>
          <form className="signup" onSubmit={(e)=>{e.preventDefault(); /* handle submit */}}>
            <label htmlFor="email" className="visually-hidden">Email</label>
            <input id="email" type="email" placeholder="Enter your email" required />
            <button type="submit">Sign up for free</button>
          </form>
        </div>
        <div className="hero__visual">
          {/* Image / slideshow placeholder */}
          <div className="hero__image" aria-hidden="true" />
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="features">
        <ul className="feature-list">
          <li>
            <h3>Discover hidden gems</h3>
            <p>Explore curated destinations tailored to your profile and preferences.</p>
          </li>
          <li>
            <h3>Stay in the know</h3>
            <p>We factor in live weather updates to ensure your trips are always timely.</p>
          </li>
          <li>
            <h3>Plan with ease</h3>
            <p>Receive ready-to-go itineraries that include maps, activities, and events.</p>
          </li>
        </ul>
      </section>

      {/* Footer CTA */}
      <section className="cta-footer">
        <h2>Start your next adventure today</h2>
        <button>Get Started</button>
      </section>
    </main>
  );
};
```

## CSS Token Suggestions

| Token | Example | Purpose |
|-------|---------|---------|
| --color-primary | #02A551 | Actions / CTAs |
| --color-accent | #2196F3 | Highlights / links |
| --color-warm | #FF7F57 | Secondary emphasis |
| --color-bg | #FFFFFF | Background |
| --color-bg-alt | #F5F9F7 | Section contrast |
| --radius-sm | 4px | Inputs |
| --radius-md | 8px | Cards / buttons |
| --shadow-sm | 0 2px 4px rgba(0,0,0,0.08) | Light elevation |

## Validation Checklist

* [ ] All text readable on mobile
* [ ] Form accessible (labels + errors)
* [ ] Button focus state visible
* [ ] Lighthouse performance ≥ 90
* [ ] CLS < 0.05 (avoid layout shift)

## Future Enhancements

- A/B test alternative hero subcopy
- Add social proof (user counter / testimonial placeholder)
- Inline privacy note under email field
- Add geo-personalized teaser ("Looks sunny near Brasov this weekend")

Last updated: 2025-09-05
