# TCB TF1682 — Credit Card Experience

A single-page, mobile-first, interactive 3D showcase for Techcombank credit-card offers. **Independent informational landing page, not an official Techcombank property.** No lead collection, no card/account/OTP fields, and no backend.

Live: https://longnguyen9495.github.io/tcb/

## Run locally

```bash
python3 -m http.server 4173
# open http://localhost:4173/
```

No build step or external JavaScript dependency. Files: `index.html`, `styles.css`, `script.js`, `assets/*.webp`, `.github/workflows/pages.yml`, `DESIGN.md`, `WORKFLOW.md`.

## Design and implementation process

- **Taste Skill:** editorial hierarchy, distinctive typography, spacious composition, motion restraint.
- **Vercel Web Interface Guidelines:** semantic controls, accessible focus, labels, reduced motion, safe areas, performance and responsive checks.
- **Awesome Design Skills:** a documented premium visual language with tokens, reusable components and acceptance criteria (`DESIGN.md`).
- **21st.dev Magic MCP concepts:** reusable component patterns (hero/showcase, product grid, bento, gallery, dialog). The external MCP server was **not connected or invoked**; source components are independently implemented.
- **Playwright browser tests:** automated interactions and screenshot snapshots; see `tests/smoke.py`. Use `python tests/smoke.py` where Playwright + Chromium are available.

## Campaign content and compliance

- Four card offers: Visa Signature, Spark, Everyday and Visa Eco.
- Six supplied poster images in `assets/`; all rates and conditions derived from these poster images are expressly labelled as references, **not guarantees**.
- All registration/outbound actions point to official Techcombank URLs, with `rel="noopener noreferrer"`.
- Consultation code: **TF1682**. Buttons copy the code; no personal data is transmitted.
- The card illustrations are CSS-created approximations, not scans or real payment-card information.

## Deployment

GitHub Actions workflow `pages.yml` deploys the static root to GitHub Pages on each push to `main` (Settings → Pages → Source: GitHub Actions). No secrets required.

## CI and Playwright CLI

GitHub Actions runs Chromium smoke tests as a separate workflow alongside publishing (desktop and mobile emulation); Pages deployment is not blocked by installation of test browsers. Locally:

```bash
npm install
npx playwright install chromium
npx playwright test
```

If your environment also has the separate Microsoft `playwright-cli`, you may use it to inspect the page and take interactive snapshots. The included automated tests use the official Playwright **test CLI**. In an environment where local browser navigation is blocked by policy, use GitHub Actions test results instead.
