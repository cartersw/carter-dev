# [carterwildenradt.dev](https://carterwildenradt.dev)

Personal portfolio. A terminal-styled landing page built with Next.js, TypeScript, and Tailwind CSS.

## Getting started

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Layout

```
web/app
├── components/   SectionNav, Terminal
├── constants/    name and home directory
├── content/      section list and the text each command prints
├── hooks/        typing and decode animations
└── lib/          pure terminal script helpers
```

Section copy lives in `web/app/content/sections.ts`. Each section is a short
list of preset commands with the text they print, so adding a section means
adding an entry there and to `SECTIONS`.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start the dev server     |
| `npm run build` | Production build         |
| `npm run start` | Serve the built app      |
| `npm run lint`  | Lint with ESLint         |
