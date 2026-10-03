---
name: NEO-SCOPE Intelligence
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2f0'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dfe2f0'
  inverse-on-surface: '#2d303b'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#f7f4ff'
  on-tertiary: '#131e8c'
  tertiary-container: '#d4d6ff'
  on-tertiary-container: '#4953bc'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#e0e0ff'
  tertiary-fixed-dim: '#bdc2ff'
  on-tertiary-fixed: '#000767'
  on-tertiary-fixed-variant: '#2f3aa3'
  background: '#0f131d'
  on-background: '#dfe2f0'
  surface-variant: '#31353f'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 76px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-telemetry:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.12em
  label-coord:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.14em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the intersection of cinematic deep space exploration and meticulous scientific precision. Built for planetary defense researchers, astrophysicists, and high-level space agency intelligence operators, it balances awe-inspiring cosmic scope with surgical data density.

### Core Philosophy & Visual Movements
- **Liquid Glass & Refractive Lensing:** Panels and HUD overlays mimic polished optical glass in zero-gravity—ultra-translucent fills, delicate inner specular light falloffs, and micro-thin luminous edges that frame planetary visualizations without occluding celestial bodies.
- **Deep Space Monolith:** The canvas is an absolute void of deep cosmic blacks (`#020306`) and chilled interstellar navies (`#050811`). Contrast is razor-sharp; elements emerge from total darkness through electric radiation fields and orbital neon trajectories.
- **Aerospace Telemetry Precision:** Every status indicator, coordinate grid, and trajectory vector feels derived from NASA JPL Horizons ephemerides. Visuals prioritize clarity, micro-typography, high legibility, and exactitude over superfluous ornamentation.

## Colors

The palette operates in strict dark mode, reflecting the electromagnetic signatures of deep space and planetary observation telemetry.

### Palette Architecture
- **Primary (`#00F0FF`):** Electric Cyan. Reserved for critical focal points, active trajectory lines, hazardous object alerts, selection states, and primary interactive affordances.
- **Secondary (`#38BDF8`):** Atmosphere Ice Blue. Used for secondary navigation, standard orbital vectors, data visualization charts, and interactive focus outlines.
- **Tertiary (`#818CF8`):** Celestial Violet Glow. Signifies machine learning probability bands, deep-sky background emissions, and auxiliary orbital mechanics calculations.
- **Neutrals & Surfaces:**
  - Base Deep Void: `#020306`
  - Space Navy (App Canvas): `#050811`
  - Elevated Glass Deck: `rgba(8, 11, 20, 0.65)`
  - Frosted Substrate: `rgba(15, 23, 42, 0.45)`
  - Luminous Border Neutral: `rgba(255, 255, 255, 0.08)` to `rgba(56, 189, 248, 0.25)`
- **Telemetry Indicators:**
  - Safe Trajectory / Live Stream: `#10B981` (Telemetry Emerald)
  - Potential Hazard Alert: `#F59E0B` (Solar Amber)
  - Impact Risk Warning: `#F43F5E` (Hypervelocity Crimson)

## Typography

The typographic hierarchy creates immediate distinction between conceptual editorial authority and clinical flight telemetry.

### Typographic Roles
- **Display & Headlines (`Space Grotesk`):** Engineered, geometric sans with distinctive technical personality. Applied in uppercase or tight title casing to command presence across hero banners, section dividers, and primary scientific statistics.
- **Body & Longform (`Inter`):** Neutral, hyper-legible, human-centric sans-serif designed for continuous reading of orbital physics breakdowns, research reports, and technical abstracts.
- **Telemetry & Metadata (`JetBrains Mono`):** Fixed-width, highly disciplined monospace applied to orbital coordinates (RA/Dec), JPL Horizons time stamps, velocity indicators, live packet trackers, and technical badge markers. All telemetry labels enforce uppercase or strict mathematical conventions.

## Layout & Spacing

The layout follows an open, cinematic spatial grid designed to support high-fidelity 3D viewport canvas environments, data overlays, and responsive side-dock telemetry modules.

### Grid Architecture
- **Desktop (≥ 1280px):** 12-column fluid grid with maximum container constraint of `1680px`. Left and right screen margins lock at `margin` (`3rem`), with `1.5rem` gutters. HUD status anchors lock to the lower and upper browser viewports, providing a zero-obscuration viewing aperture.
- **Tablet (768px – 1279px):** 8-column layout with `2rem` outer margins. Secondary side-panels fold into sliding glass drawers or horizontal ribbon metrics.
- **Mobile (< 768px):** 4-column layout with `1.25rem` outer margins. Hero displays drop from two-column split viewports to stacked vertical sequences with top-pinned live telemetry strips.

### Spatial Rhythms
- Internal component spacing relies strictly on a 4px/8px incremental rhythm (`space-xs` through `space-xl`).
- High-density data readouts use `space-xs` and `space-sm` to maintain dashboard compactness, while editorial space narratives expand outward with macro gap separations of `space-xl` and above.

## Elevation & Depth

Visual hierarchy relies on refractive glassmorphism, radial luminescence, and optical specular boundaries rather than standard drop shadows.

### Atmospheric Tiers
1. **Tier 0 (Celestial Canvas):** Base `#020306` background populated by WebGL three-dimensional starfields, planetary rendering, and orbital splines.
2. **Tier 1 (Surface Glass):** Translucent backdrop blur panels (`background: rgba(8, 11, 20, 0.65)`, `backdrop-filter: blur(16px)`). Bound by a 1px border gradient transitioning from `rgba(255, 255, 255, 0.15)` at the top edge to `rgba(56, 189, 248, 0.05)` at the bottom edge.
3. **Tier 2 (Interactive Floating HUD):** Navbars, telemetry cards, and flight path controllers (`background: rgba(15, 23, 42, 0.75)`, `backdrop-filter: blur(24px)`). Accented by a subtle electric glow: `box-shadow: 0 0 24px -4px rgba(0, 240, 255, 0.15)`.
4. **Tier 3 (Modals & Critical Overlays):** Deep navy liquid glass (`background: rgba(5, 8, 17, 0.92)`, `backdrop-filter: blur(32px)`), bounded by a crisp 1px `#38BDF8` border with high-intensity halo: `box-shadow: 0 0 40px -8px rgba(0, 240, 255, 0.35)`.

## Shapes

The design uses a refined pill-shaped and stadium-curved philosophy (`roundedness: 3`) across high-level interactive elements, balanced against strictly clipped technical cards.

### Shape Hierarchy
- **Pill Containers (`rounded-full`):** Navigational link pills, primary CTAs, scientific chip tags, and live tracking status capsules. The smooth curvature provides an ergonomic, human-centric cockpit feel against technical aerospace calculations.
- **Liquid Cards & HUD Sheets (`rounded-2xl` / 1.5rem):** Trajectory cards, telemetry viewports, and detail inspectors use softened corners combined with 1px hairline perimeter borders to emulate optical display hardware.
- **Telemetry Reticles & Focus Points:** Coordinate crosshairs, orbital nodes, and targeting brackets utilize geometric circles and orthogonal hairpins.

## Components

### Buttons
- **Primary Glow Pill:** Stadium-shaped (`rounded-full`), transparent glass core with electric cyan border (`1px solid #00F0FF`). Background: `linear-gradient(180deg, rgba(0, 240, 255, 0.18) 0%, rgba(0, 240, 255, 0.04) 100%)`. Label in `Space Grotesk` uppercase with arrow icon. Hover triggers an expanding atmospheric cyan glow (`box-shadow: 0 0 25px rgba(0, 240, 255, 0.45)`).
- **Secondary Ghost Pill:** Glass boundary (`1px solid rgba(255, 255, 255, 0.15)`), fill `rgba(255, 255, 255, 0.03)`. Text in white with leading icon (e.g., play/telemetry). Hover brightens edge to `rgba(255, 255, 255, 0.4)`.

### Chips & Telemetry Badges
- **Status Indicator Chip:** Compact pill capsule with `rgba(8, 11, 20, 0.8)` background, hairline border (`rgba(255, 255, 255, 0.1)`), featuring a 6px glowing radial pulse dot (emerald `#10B981` for active data streams, cyan `#00F0FF` for catalog category). Typography in `JetBrains Mono` label-telemetry with high letter-spacing.

### Data Cards & Glass Panels
- **Orbital Inspector Card:** Built with `backdrop-filter: blur(20px)` over `rgba(5, 8, 17, 0.7)`. Top border sports a 1px linear specular highlight (`rgba(255,255,255,0.2)` fading to transparent). Card headers display object designation (e.g., `(99942) APOPHIS`) in `Space Grotesk` alongside velocity metrics in `JetBrains Mono`.

### Input Fields & Search HUD
- **Planetary Query Bar:** Pill-shaped glass container with integrated search icon, inner background `rgba(8, 11, 20, 0.6)`. Active focus transitions border from `rgba(255,255,255,0.1)` to `rgba(0, 240, 255, 0.8)` accompanied by an ambient cyan interior bloom. Text renders in `Inter` with placeholder in muted slate (`#64748B`).

### Checkboxes, Radios & Switches
- **Telemetry Checkboxes:** 16px square with 3px rounded corners. Unchecked state: `1px solid rgba(255, 255, 255, 0.2)`. Checked state: solid fill with `#00F0FF`, featuring a deep navy checkmark and micro halo.
- **Flight Parameter Switches:** Track is a 36px wide pill in muted charcoal glass; thumb is an illuminated `#38BDF8` sphere that emits a low ambient flare when engaged.

### Specialized Aerospace Overlays
- **Coordinate Reticles:** Fixed screen-edge indicators in `JetBrains Mono` (RA/Dec, Julian dates, distance in AU) framed by thin 1px crosshair ticks (`rgba(56, 189, 248, 0.3)`).
- **Interactive Navigation Rail:** Horizontal floating glass bar with subtle indicator underlines (`2px solid #00F0FF` with a diffused glow underneath active link item).