---
name: Reputation Pulse Identity
colors:
  surface: '#0d1322'
  surface-dim: '#0d1322'
  surface-bright: '#33394a'
  surface-container-lowest: '#080e1d'
  surface-container-low: '#151b2b'
  surface-container: '#191f2f'
  surface-container-high: '#242a3a'
  surface-container-highest: '#2f3445'
  on-surface: '#dde2f8'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dde2f8'
  inverse-on-surface: '#2a3040'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0d1322'
  on-background: '#dde2f8'
  surface-variant: '#2f3445'
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 120px
---

## Brand & Style

The visual identity for this design system is rooted in the "High-Performance Technical Premium" aesthetic, blending the precision of developer-centric tools with the polished allure of high-end marketing. It targets executive decision-makers and growth teams who value clarity, speed, and data integrity.

The style is a synthesis of **Minimalism** and **Glassmorphism**, characterized by:
- **Depth through Luminosity:** Rather than traditional shadows, depth is achieved through 1px inner borders, subtle outer glows, and layered translucency.
- **Precision Engineering:** Every element feels intentional, utilizing tight grids and sharp typography to evoke a sense of "Pulse" monitoring and real-time responsiveness.
- **Atmospheric Backgrounds:** Deep, saturated surfaces are broken up by soft radial gradients that guide the eye toward primary conversion points and critical data metrics.

## Colors

The palette is designed for a "Premium Dark" experience, prioritizing legibility and visual hierarchy in low-light environments.

- **Primary (Emerald):** Used for "Success" states, primary call-to-actions, and positive reputation trends.
- **Secondary (Cyan):** Used for interactive accents, links, and data visualization highlights.
- **Utility Palette:** 
    - **Amber (#F59E0B):** Signals warnings, neutral sentiment, or pending actions.
    - **Rose (#F43F5E):** Identifies risks, negative sentiment, and urgent errors.
- **Background Strategy:** The Deep Navy base (#0B1120) should be layered with semi-transparent surfaces to create a sense of physical stacking. Use 1px borders in a lighter gray or primary-tinted hex to define boundaries.

## Typography

This design system utilizes a dual-sans-serif pairing to distinguish between branding and utility.

- **Headlines (Geist):** Employ a tight tracking (negative letter-spacing) for large display text to create a compact, high-impact marketing feel. The monospaced-adjacent metrics of Geist lend a technical authority to the data.
- **Body (Inter):** Chosen for its exceptional readability at small scales. Maintain a generous line-height (1.6) to ensure data-heavy layouts remain approachable.
- **Labels:** Use Geist Medium in uppercase for small UI markers, navigation items, and table headers to reinforce the technical nature of the system.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with strict 8px/4px increments for internal component spacing.

- **Grid:** Use a 12-column grid for desktop with 24px gutters. Elements should snap to the grid to maintain "Linear-style" alignment.
- **Sectioning:** Vertical rhythm is defined by large gaps (80px–120px) between marketing sections to allow the dark background and radial gradients to "breathe."
- **Responsive Behavior:** 
    - **Desktop:** 12 columns, 64px side margins.
    - **Tablet:** 8 columns, 32px side margins.
    - **Mobile:** 4 columns, 16px side margins. Large display typography should scale down by 25% (e.g., 72px to 54px) to avoid awkward wrapping.

## Elevation & Depth

In the absence of heavy shadows, hierarchy is established through **Tonal Layers** and **Luminous Borders**.

- **Level 0 (Base):** The #0B1120 background.
- **Level 1 (Card/Surface):** Semi-transparent fills (10–15% opacity) with a `backdrop-filter: blur(12px)`.
- **Level 2 (Active/Hover):** Increase the background opacity and add a 1px primary-colored (#10B981) inner stroke to simulate a "glow" from within.
- **Gradients:** Use large, low-opacity (5-10%) radial gradients in Emerald or Cyan positioned behind key cards or sections to create focal points and depth without clutter.

## Shapes

The shape language is sophisticated and modern, leaning into substantial corner radii to offset the "coldness" of the dark theme.

- **Main Containers:** Use `rounded-2xl` (1.5rem) for cards, modals, and major sections.
- **UI Elements:** Buttons and input fields should use `rounded-lg` (1rem) for a cohesive but slightly more compact feel.
- **Iconography:** Use 2px stroke weights with slightly rounded ends (Round join/cap) to match the typography's balance of sharpness and approachability.

## Components

- **Buttons:** 
    - *Primary:* Emerald fill with white/dark-navy text. Apply a subtle 2px bottom shadow in a darker shade of emerald for a tactile feel.
    - *Secondary:* Transparent background with a 1px border (`rgba(255,255,255,0.1)`) and a hover state that brightens the border to Cyan.
- **Cards:** Utilize the Glassmorphism approach: `background: rgba(255,255,255,0.03)`, `backdrop-filter: blur(10px)`, and a 1px top-weighted border to catch "light" from above.
- **Input Fields:** Darker than the card background to create a "inset" look. Use a Cyan focus ring (2px) with a soft outer glow.
- **Chips/Badges:** Small, pill-shaped markers for sentiment (Positive: Emerald, Negative: Rose). Use a low-opacity background of the color with high-contrast text.
- **Charts:** Maintain a clean, minimalist style. Data lines should be 2px thick with a subtle gradient fill underneath (area chart) that fades to transparent.