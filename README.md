# LLM Skills Registry

A static-registry website for hosting LLM skill manifests, inspired by [klibs.io](https://klibs.io/).

## How it works
- **Database:** All skills are stored as JSON files in the `skills/` directory.
- **Site Generation:** A pre-build script (`scripts/generate-registry.mjs`) crawls the `skills/` folder and creates a `registry.json` file used by the frontend.
- **Search:** Filtering and searching happen client-side for maximum speed and zero server cost.
- **Hosting:** Fully compatible with GitHub Pages.

## Deployment to GitHub Pages
1. Build the project: `npm run build`
2. This generates an `out/` folder.
3. Configure your GitHub repository to serve the site from the `gh-pages` branch (or via a GitHub Action).

## Submitting a New Skill
Users can submit skills via the "Submit" page on the website. This page generates a GitHub "New File" URL which pre-fills the JSON data. When the user saves, it opens a Pull Request for you to review.

## Tech Stack
- **Next.js** (Static Site Generation)
- **Vanilla CSS** (No dependencies, fast loading)
- **GitHub API** (For submissions)
