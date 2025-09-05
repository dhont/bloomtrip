# Accessibility & Inclusive Design

Baseline target: WCAG 2.2 AA.

## Checklist (Early)
- Semantic headings (h1→h2→h3 sequence)
- Alt text on informative images
- Color contrast ≥ 4.5:1 normal text
- Keyboard focus visible & logical order
- No content dependent solely on color

## Testing Stack (Planned)
- axe-core automated scans
- Manual keyboard traversal
- Screen reader spot checks (NVDA + VoiceOver)

## Roadmap
1. Add automated CI lint for MD images missing alt.
2. Color contrast audit of diagrams.
3. Provide reduced-motion option.
