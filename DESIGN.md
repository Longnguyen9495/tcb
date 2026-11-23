# TF1682 · Design system

## Intent
An editorial, premium banking-product showroom: confident typography, bold asymmetry, tactile card imagery, sharp contrast and one clear task—discover a suitable card and save the consultant code. This is an **independent promotional guide**, not an official bank interface.

## Foundation
- Colors: Ink `#161319`, night `#151116`, signal red `#E71A39`, pink accent `#FF647B`, ivory `#F8F6F2`, line `#E8E4E1`.
- Type: Manrope for body/heads, Instrument Serif italic for emotional emphasis; system/Georgia fallbacks.
- Shell max-width 1360 px; responsive gutters 48/32/19 px.
- 2D surfaces with CSS 3D rotor and four theme presets; no canvas/WebGL dependency.
- 120/90/72 px section rhythm by viewport; 22 px tile radius; visible actions and CTAs.

## Component library (21st-style concepts, implemented locally)
- Navigation with independent-page notice, responsive menu and consultant badge.
- Hero interactive bank-card showroom: 4 variants + reversible 3D model + pointer tilt.
- Filterable product catalogue (deep-linkable via `?nhu-cau=`), direct official links, offer highlights.
- Bento benefits mosaic, horizontally scroll-snapped poster collection, accessible native dialog and gallery controls.
- Three-step application guidance, copy-code CTA, FAQ disclosures and mobile fixed action bar.

## Interaction and accessibility contract
- `prefers-reduced-motion` kills float, marquee and reveal animation.
- Native buttons for actions; native links for navigation; accessible visible focus styles and labels.
- Toast with `aria-live`, native `<dialog>` with focus return, keyboard arrows/escape.
- Touch targets >= ~40 px, mobile viewport safe-area, no accidental horizontal document overflow.
- Poster `<img>` tags have alt text and dimensions; lower content lazy-loaded.
- Images from supplied source files; no fake banking data or unapproved contact form.

## Verification
Static regression checks, viewport screenshots 1440×900, 390×844 and 360×780, interaction checks for switching/flip/filter/copy/dialog/FAQ and JS errors. See tests.
