# İrfan Kaan Algan — Portfolio

Personal portfolio website with an AI-powered chat assistant.
Live at **[irfanalgan.com](https://irfanalgan.com)**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 17, Framer Motion, react-icons |
| Styling | CSS (custom properties, responsive) |
| AI Chat | Groq API — `llama-3.1-8b-instant` |
| Backend | Netlify Serverless Function |
| Contact Form | Formspree |
| Hosting | Netlify |
| Domain | GoDaddy → irfanalgan.com |

---

## Features

- **AI Chat Assistant** — Answers questions about Irfan's background, experience and projects. Responds in the visitor's language (TR/EN). Scoped strictly to portfolio context.
- **Timeline** — Chronological education & experience (2017 → present)
- **Skills Section** — Tech stack with tooltips
- **Contact Form** — Formspree-powered, no backend required
- **Responsive** — Mobile-friendly layout

---

## Project Structure

```
src/
├── components/
│   ├── ChatWidget/       # AI chat bubble
│   └── Navbar/
├── container/
│   ├── Header/           # Hero section
│   ├── About/            # Bio + expertise cards
│   ├── Skills/           # Skills grid + timeline
│   └── Footer/           # Contact form
├── assets/               # Images & icons
├── constants/            # Image exports
├── data/                 # irfanContext.js (gitignored)
└── wrapper/              # AppWrap / MotionWrap HOCs

netlify/
└── functions/
    └── chat.js           # Serverless chat endpoint
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start React dev server
npm start

# Start local API server (separate terminal)
node server.js
```

Requires a `.env.local` file:

```
GROQ_API_KEY=your_groq_api_key
```

---

## Deployment

Deployed automatically via Netlify on every push to `main`.

Required environment variables in Netlify dashboard:

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Groq API key |
| `IRFAN_CONTEXT` | Contents of `src/data/irfanContext.js` (the template string) |

---

## Notes

- `src/data/irfanContext.js` is gitignored — contains the AI system prompt with personal data. Set its content as the `IRFAN_CONTEXT` environment variable in Netlify.
- `server.js` is only used for local development. In production, `netlify/functions/chat.js` handles all chat requests.
