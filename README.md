# TF1682 — Techcombank credit-card 3D landing page

**Independent promotional landing page** (not an official Techcombank website). It does not collect banking information or customer data. Verify all benefits, representative-code eligibility, and permission to use third-party logos/posters before going public.

## Deployment through GitHub Pages

1. Create a **public** repository on GitHub named `tcb` (owner: `Longnguyen9495`) with the default branch `main`. Link: https://github.com/new?name=tcb. GitHub Pages requires the published repo to be accessible, and the publishing workflow to have Pages permission.
2. Add `index.html`, `assets/` and `.github/workflows/pages.yml` to the repository's `main` branch. Or give the repo URL to your assistant so they can upload files for you using the connected GitHub integration.
3. Under **Settings → Pages → Build and deployment**, choose **Source: GitHub Actions**.
4. Check **Actions → Publish TF1682 3D landing page** for the green check mark.
5. GitHub Pages will display the actual public URL in **Settings → Pages**. Expected URL format for user-owned repository: `https://longnguyen9495.github.io/tcb/` (do not assume it is active until a successful deploy).

## Tech stack

Plain HTML/CSS/JavaScript, no build dependencies or backend. The `index.html` uses six optimized WebP posters under `assets/`. The workflow deploys automatically on every push to `main`; manual runs are also available.

## Local preview

```sh
python -m http.server 8080
```

Open `http://localhost:8080`.

## Security reminder

Do not add forms requesting OTP, CVV, card numbers, passwords, or national ID data. All applications and eligibility checks should be conducted on the official Techcombank website. The displayed 3D card mockups are illustrative only, and advertised benefits are subject to campaign terms.