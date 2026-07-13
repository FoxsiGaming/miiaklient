# MiiAKLIENT

This project is now set up to work from Git-based hosting right away using a static export.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for Git hosting

```bash
npm run build
```

The build outputs a static site into the `out/` folder, which works with GitHub Pages, Netlify, and similar hosts.

## Deploy from the repo

This repository includes a GitHub Actions workflow that publishes the site automatically from the main branch.

1. Push the repository to GitHub.
2. Open the repository Settings → Pages.
3. Ensure GitHub Actions is selected as the source.
4. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will publish it automatically.

## Notes

- The site uses built-in fallback content so it works without a database or server runtime.
- The contact form remains functional as a client-side POST to the API route.
- The admin view is presented as a demo/static experience for Git-hosted deployment compatibility.
