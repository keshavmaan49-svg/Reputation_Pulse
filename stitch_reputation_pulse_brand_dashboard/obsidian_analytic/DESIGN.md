---
name: Obsidian Analytic
colors:
  surface: '#121318'
  surface-dim: '#121318'
  surface-bright: '#38393e'
  surface-container-lowest: '#0d0e13'
  surface-container-low: '#1a1b20'
  surface-container: '#1e1f25'
  surface-container-high: '#292a2f'
  surface-container-highest: '#34343a'
  on-surface: '#e3e1e9'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e3e1e9'
  inverse-on-surface: '#2f3036'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb3ad'
  on-tertiary: '#68000a'
  tertiary-container: '#ff5451'
  on-tertiary-container: '#5c0008'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#121318'
  on-background: '#e3e1e9'
  surface-variant: '#34343a'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '450'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style
The design system is engineered for high-stakes enterprise AI analytics, targeting executive decision-makers and data scientists. The brand personality is authoritative, precise, and technologically advanced. 

The visual style employs a **Sophisticated Glassmorphism** approach. It leverages deep obsidian surfaces, subtle backdrop blurs, and electric accents to create a sense of infinite depth. The aesthetic is inspired by high-end developer tools and professional financial terminals, prioritizing clarity and data density while maintaining a premium, "dark mode first" atmosphere.

## Colors
This design system utilizes a tiered dark palette to establish hierarchy. The base layer is a near-black **Obsidian (#0B0C10)**, with container surfaces utilizing **Deep Charcoal (#14151A)**. 

- **Primary Accent:** Electric Indigo (#6366F1) is used for primary actions, active states, and critical data paths.
- **Sentiment Secondary:** Emerald (#10B981) represents positive growth and "Safe" sentiment scores.
- **Sentiment Tertiary:** Crimson (#EF4444) is reserved for negative anomalies and "Critical" alerts.
- **Atmospherics:** Use soft radial gradients (15% opacity) of the Primary color in the top-left corners of large dashboards to simulate light sources.

## Typography
The system relies exclusively on **Inter** for its neutral, systematic clarity. It is a utilitarian typeface that disappears to let the data lead. 

High-contrast weight distribution is key: use Bold (700) for large displays and Semi-Bold (600) for section headers. For technical data points or AI-generated logs, an auxiliary monospaced font (JetBrains Mono) is permitted at small scales to enhance the "analytical" feel. Tracking should be tightened slightly on larger headings to maintain a compact, premium appearance.

## Layout & Spacing
This design system follows a **Fixed-Fluid Hybrid** model. The main dashboard area adheres to a 12-column grid with a maximum width of 1440px, centered on the screen. 

- **Desktop:** 24px gutters and 40px outer margins.
- **Tablet:** 16px gutters and 24px margins; columns collapse to 6.
- **Mobile:** 16px margins; 1-column stack.

Spacing is generous, mimicking the "Linear" style. Use `lg` (40px) or `xl` (64px) padding for primary sections to allow the glass elements to "breathe." Vertical rhythm should be strictly maintained using multiples of 8px.

## Elevation & Depth
Depth is created through transparency and light simulation rather than traditional drop shadows.

1.  **Level 0 (Base):** Solid #0B0C10.
2.  **Level 1 (Cards/Panels):** Glassmorphism applied. Background: `rgba(20, 21, 26, 0.7)`, Backdrop-blur: `12px`. 
3.  **Borders:** Every glass container must have a 1px solid border. Use `rgba(255, 255, 255, 0.08)` for top/left and `rgba(255, 255, 255, 0.03)` for bottom/right to simulate a subtle top-down light source.
4.  **Interactive Glow:** On hover, primary elements should gain a `0px 0px 15px rgba(99, 102, 241, 0.2)` outer glow.

## Shapes
The design system utilizes **Extra-Rounded** geometry to soften the technical edge of the dark UI. 

- **Standard Cards:** 16px (rounded-xl)
- **Buttons & Inputs:** 12px (rounded-lg)
- **Small Components (Chips/Tags):** 8px (rounded-md)

The "Pressed Glass" look for active states is achieved by combining these corner radii with a subtle 1px inset shadow `inset 0 2px 4px rgba(0,0,0,0.3)`.

## Components
- **Buttons:** Primary buttons use a solid Electric Indigo fill with white text. Secondary buttons use the glass background with the Indigo border-glow.
- **Inputs:** Fields are dark obsidian (#0B0C10) with a 1px border. On focus, the border transitions to Indigo with a 2px outer "halo."
- **Cards:** Must feature the 12px backdrop blur. Titles within cards should be `label-caps` in a muted grey to de-emphasize metadata.
- **Sentiment Chips:** Small, pill-shaped indicators. Emerald (#10B981) for positive, Crimson (#EF4444) for negative. Use 10% opacity fills with 100% opacity text for a "tinted glass" look.
- **Skeleton States:** Use a shimmering gradient from #14151A to #1F2028. Skeletons should precisely match the border-radius of the components they replace.
- **Data Visualizations:** Charts should use thin stroke weights (1.5px) and avoid solid fills; use vertical linear gradients that fade to transparent at the baseline.