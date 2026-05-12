# Cricket Master Quiz — Design Brief

## Direction
Bold gaming UI with maximalist energy. Dark charcoal background, gold premium accents, red alerts. Batsman/cricket motif. Every interaction feels rewarding.

## Tone
Gaming energy, premium, rewarding, focused clarity for quiz gameplay.

## Differentiation
Gold shield/badge for score display (unforgettable). Red pulsing animations on answer selection. Batsman silhouette + cricket elements in visual background. Monospace timer for precision.

## Color Palette
| Role | OKLCH | Hex (approx) |
| --- | --- | --- |
| Background | 0.12 0 0 | #1a1a1a |
| Gold Primary | 0.7 0.15 80 | #d4a052 |
| Red Accent | 0.55 0.22 25 | #cc3333 |
| Card | 0.16 0 0 | #242424 |
| Text | 0.95 0 0 | #f2f2f2 |
| Muted | 0.18 0 0 | #2a2a2a |

## Typography
| Tier | Font | Size | Weight |
| --- | --- | --- | --- |
| Display | Bricolage Grotesque | 32–48px | 700 |
| Body | DM Sans | 16px | 400–500 |
| UI Mono | Geist Mono | 14px | 600 |
| Timer | Geist Mono | 24px | 700 |

## Elevation & Depth
Card-based layers: background → card (soft shadow) → interactive elements (gold/red glow). No rounded corners except cards (12px radius). Glass effect for overlays (blur + transparency).

## Structural Zones
| Zone | Treatment | Purpose |
| --- | --- | --- |
| Header | Dark gradient, gold border-bottom, 48px min height | Quiz title, profile badge |
| Quiz Card | bg-card, gold border accent, shadow | Question + options focus |
| Options | option-card class, hover border-primary, active bg-accent/10 | Large 48px touch targets |
| Badges | badge-gold, badge-accent classes | Score, coins, streak display |
| Footer | Muted background, centered stats | Navigation or additional info |

## Spacing & Rhythm
Density: 16px baseline grid. Card padding: 24px. Option margin: 12px. Touch targets: 48px minimum. Consistent 16px gaps between sections.

## Component Patterns
- **Buttons**: `.button-gold` (primary), `.button-accent` (destructive/alert). Min 48px height.
- **Cards**: `.option-card` for quiz options; hover state reveals primary border, active state shows accent background with pulsing glow.
- **Badges**: `.badge-gold` for coins/score, `.badge-accent` for alerts.
- **Overlays**: `.glass` effect for modals or notifications.

## Motion & Animation
300ms smooth transitions across all interactive elements. Keyframes: `pulse-accent` (gold glow on selection), `slide-up` (entrance), `fade-in` (cards). All animations use `cubic-bezier(0.4, 0, 0.6, 1)` for gaming feel.

## Constraints
- No arbitrary colors; use semantic tokens only (primary, accent, destructive, muted).
- High contrast for readability: foreground 0.95, background 0.12 (Δ ≈ 0.83).
- Mobile-first: single-column layout, 100% width quiz card, stacked options.
- Dark mode enforced; no light mode variant.
- No rounded corners except cards/badges/buttons (12px). Borders and inputs sharp.

## Signature Detail
Gold shield/badge with soft glow for score display — inspired by Cricket Master app icon. Pulsing red animation on answer selection creates gaming reward feedback.
