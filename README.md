# My Personal Site

This repository contains the static-first Astro site for `https://adre.me`. The public site is built into `dist/` and deployed with Firebase Hosting for CDN delivery, HTTPS, custom domain routing, preview channels, and production releases.

## Requirements

- Node.js 22
- Yarn 1.22
- Nix with flakes enabled
- Firebase CLI authentication for deploys
- OpenTofu for infrastructure changes
- Podman with an external `traefik` network for containerized local development

The Nix shell provides the expected Node, Yarn, Firebase CLI, and OpenTofu toolchain:

```sh
nix develop
```

## Local Development

Install dependencies and start Astro directly:

```sh
yarn install
yarn dev
```

Astro serves the site at `http://127.0.0.1:4321/` by default.

For Podman-based development:

```sh
podman compose -f compose.yml up
```

The Compose service uses `node:22-bookworm-slim`, installs from `yarn.lock`, joins the external `traefik` Podman network, and exposes Astro through the global Traefik service at `http://site.personal-site.localhost:8080/`.

The global Traefik provider applies the local default host rule, `service.project.localhost`. When this command runs from the repository root, the Compose project is `personal-site` and the service is `site`, so the default host is `site.personal-site.localhost`. The service only needs labels for enabling Traefik and pointing the load balancer at Astro's port `4321`.

The container sets `LOCAL_DEV_HTTP=1` and `PUBLIC_SITE_URL=http://site.personal-site.localhost:8080` so Astro and Vite stay on plain HTTP locally. HMR is forced to use `ws`, not `wss`.

## Build

Run the production static build:

```sh
yarn build
```

Run the same build through the Nix shell:

```sh
nix develop -c yarn build
```

The build runs `astro check` before `astro build`. Astro telemetry is disabled in npm scripts so local and container builds do not write user-level telemetry config.

## Styling

Use Tailwind CSS for page styling.

The Tailwind setup includes:

- `fluid-tailwind` for clamp-based responsive utilities, such as `~text-lg/xl`.
- `@tailwindcss/container-queries` for container-scoped variants, such as `@md:my-4`.
- Project colors and font families in `tailwind.config.cjs`.
- Global base styles in `src/styles/global.css`.

Keep page-level CSS in Tailwind utilities unless a component needs a genuinely custom rule that Tailwind cannot express cleanly.

## Animation

Use GSAP first for Astro-native animation. Prefer client-side Astro scripts for page-load, scroll, timeline, and element animation.

Do not add React islands for animation-only behavior. If a future component needs React state or Motion-style component animation, add Astro's React integration at that point. If Motion is needed, prefer the current package style: `motion` with imports from `motion/react`.

## Firebase Hosting

`firebase.json` points Hosting at `dist/`, enables clean URLs, and sets cache headers for static assets and HTML.

Preview deploys should happen before production deploys:

```sh
yarn firebase:preview --project YOUR_GCP_PROJECT_ID
yarn firebase:deploy --project YOUR_GCP_PROJECT_ID
```

Use Firebase Hosting rewrites only when a future feature needs dynamic routing. Keep the main site static-first.

## Infrastructure

Terraform/OpenTofu manages project setup, enabled APIs, IAM, Firebase resources where practical, Cloudflare DNS records, and billing budget guardrails.

Validate infrastructure changes with:

```sh
tofu -chdir=terraform/shared validate
tofu -chdir=terraform/environments/production validate
tofu -chdir=terraform/environments/staging validate
```

The shared budget defaults to `$10` per month with alert thresholds at 50%, 90%, and 100%. Keep this budget low unless the site gains an explicit paid dependency. Avoid always-on VMs, managed databases, clusters, and load balancers for this static site.

## Commits And Branches

This migration branch is `feature/astro-firebase`.

Use conventional commit prefixes in commit messages. Common types for this repo are `feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`, and `build:`. These are documented expectations only; there are no local hooks or CI enforcement yet.

After this migration merges, create a separate redesign branch so visual redesign work stays isolated from the framework and hosting migration.

## Release Checklist

- Verify the Astro dev server renders the landing page.
- Verify `yarn build` succeeds.
- Verify `nix develop -c yarn build` succeeds.
- Verify `podman compose -f compose.yml config` succeeds.
- Deploy and inspect a Firebase Hosting preview channel before production.
- Check the custom domain, HTTPS, social metadata, favicon, image assets, resume PDF, and external links.
- Confirm GSAP animations run without a React island.
- Confirm the billing budget points at the intended billing account and project.
