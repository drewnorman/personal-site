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

The Compose service uses `node:22-bookworm-slim`, runs the Astro binary from the bind-mounted workspace, joins the external `traefik` Podman network, and exposes Astro through the global Traefik service at `http://site.personal-site.localhost:8080/`. Run `yarn install` on the host before starting the container so `node_modules/.bin/astro` exists.

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

GitHub Actions handles test and deploy automation:

- `CI` runs `yarn test` on pushes and pull requests.
- `Firebase Preview` runs `yarn test` and deploys a 7-day Firebase Hosting preview channel for pull requests opened from this repository.
- `Release Please` opens and maintains a release PR from conventional commits on `master`. Merging that PR creates the final release tag and GitHub Release.
- `Firebase Staging` runs `yarn test` and deploys the Firebase Hosting `staging` channel when an `-rc` release tag is pushed, such as `v0.3.1-rc1`.
- `Firebase Production` runs `yarn test` and deploys live Firebase Hosting when a non-`-rc` release tag is pushed, such as `v0.3.1`.

Production deploys do not run for ordinary commits to `master`. Push a release-candidate tag for staging first, then push the final release tag for production once the staging channel has been inspected.

Release Please must use a personal access token or GitHub App token so the release tags it creates can trigger the production deploy workflow. Configure that token as this repository secret:

- `RELEASE_PLEASE_TOKEN`

Preview, staging, and production deploys authenticate to Google Cloud through GitHub OIDC Workload Identity Federation. The required GitHub Actions secrets are managed by the shared Terraform:

- `WIF_PROVIDER`
- `GCP_SA_EMAIL`

Manual deploy commands are still available:

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

Use conventional commit prefixes in commit messages. Common types for this repo are `feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`, and `build:`. These are documented expectations only; there are no local hooks or CI enforcement yet.

## Repository Visibility

The repository can be made public. Tracked files do not contain deployment credentials, API tokens, private keys, Terraform state, or real tfvars files. Sensitive values are either placeholders or injected through GitHub Actions secrets and Workload Identity Federation.

Before changing visibility, keep generated/local files out of Git and confirm GitHub secret scanning is enabled for the public repository.

## Release Checklist

- Verify the Astro dev server renders the landing page.
- Verify `yarn build` succeeds.
- Verify `nix develop -c yarn build` succeeds.
- Verify `podman compose -f compose.yml config` succeeds.
- Confirm the Release Please PR proposes the expected next version, changelog, and `package.json` version.
- Push an `-rc` tag matching the proposed version, such as `v0.3.1-rc1`, and inspect the Firebase Hosting staging channel before production.
- Merge the Release Please PR to create the final release tag, such as `v0.3.1`, and deploy production.
- Check the custom domain, HTTPS, social metadata, favicon, image assets, resume PDF, and external links.
- Confirm GSAP animations run without a React island.
- Confirm the billing budget points at the intended billing account and project.
