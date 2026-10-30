# James Portfolio

A responsive, multi-page portfolio built with semantic HTML, Tailwind CSS 4 utilities, custom CSS, TypeScript, and Vite.

Tailwind is integrated through its Vite plugin. Its preflight reset is intentionally omitted so the existing custom design remains intact; responsive layout primitives and shared container sizing use Tailwind utilities, while component styling and the visual theme stay in `style.css`.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```sh
npm install
npm run dev
```

Vite serves both `index.html` and `resume.html`. Use the printed local URL; opening the HTML files directly does not run the TypeScript modules.

## Validate and build

```sh
npm run typecheck
npm run build
npm run preview
```

The production site is written to `dist/`.