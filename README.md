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

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Enable GitHub Pages in the repository settings.
3. Set the publish source to the `out` folder.
4. Visit the published URL.

## Notes

- The site uses built-in fallback content so it works without a database or server runtime.
- The contact form remains functional as a client-side POST to the API route.
- The admin view is presented as a demo/static experience for Git-hosted deployment compatibility.
