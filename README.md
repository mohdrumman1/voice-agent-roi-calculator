# Voice Agent ROI Calculator — Forma AI

A sales tool that lets prospects enter business details and receive a personalised ROI report for AI voice agents — built with React, Vite, and Cloudflare Pages.

## Features

- Dark-themed, mobile-responsive UI matching Forma AI design language
- Six-field intake form with inline validation and pain-point selection
- AI-generated ROI report via Google Gemini 2.0 Flash (OpenRouter)
- Printable one-page PDF summary
- API key stored as a Cloudflare Pages secret — never in the client bundle

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 4 |
| API proxy | Cloudflare Pages Function (`functions/api/generate-roi.js`) |
| AI model | `google/gemini-2.0-flash-001` via OpenRouter |
| Hosting | Cloudflare Pages |

## Local development

```bash
npm install
npm run build          # build once so wrangler has a dist/ to serve
wrangler pages dev dist --port 8788   # in one terminal
npm run dev            # Vite dev server proxies /api → 8788
```

Add your key to a `.env` file (never commit it):
```
OPENROUTER_API_KEY=sk-or-...
```

## Deployment (Cloudflare Pages)

1. Push the repo to GitHub.
2. In the Cloudflare Pages dashboard: **Create project → Connect GitHub → select `voice-agent-roi-calculator`**.
3. Build command: `npm run build` | Output directory: `dist`.
4. Add environment variable: `OPENROUTER_API_KEY = sk-or-...`.
5. Deploy — the Pages Function is auto-deployed from `functions/`.

## About

Built by **Rumman** — founder of [Forma AI](https://formaai.info), an AI automation agency helping Australian businesses reduce costs and scale with intelligent voice and workflow automation.

- Website: [formaai.info](https://formaai.info)
- GitHub: [@mohdrumman1](https://github.com/mohdrumman1)
