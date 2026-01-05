# Chameleon Shapes 🦎

A collaborative drawing app where multiple users can draw together over a chameleon image in real-time.

## Features

- **Real-time collaboration**: Draw with others simultaneously
- **Unique colors**: Each user gets a random color for their strokes
- **Live user count**: See how many "animals that change" are connected
- **Secret easter egg**: Type a special phrase to discover a hidden link

## Tech Stack

- **Frontend**: p5.js for canvas drawing, vanilla JavaScript
- **Real-time**: PartyKit (WebSocket server on the edge)
- **Hosting**: Vercel (static files) + PartyKit (real-time)

## Deployment

This app uses a two-part deployment:

### 1. Deploy PartyKit (Real-time Server)

```bash
# Install dependencies
npm install

# Login to PartyKit (first time only)
npx partykit login

# Deploy the PartyKit server
npm run deploy:partykit
```

After deployment, note your PartyKit URL (e.g., `chameleon-shapes.YOUR_USERNAME.partykit.dev`).

### 2. Update Client Configuration

Edit `public/client.js` and update the `PARTYKIT_HOST` variable with your PartyKit URL:

```javascript
const PARTYKIT_HOST = window.location.hostname === "localhost" 
  ? "localhost:1999" 
  : "chameleon-shapes.YOUR_USERNAME.partykit.dev"; // Your PartyKit URL
```

### 3. Deploy to Vercel

Connect your GitHub repo to Vercel, or use the CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Settings for Vercel:**
- Framework Preset: Other
- Root Directory: `./`
- Output Directory: `public`

## Local Development

```bash
# Install dependencies
npm install

# Start PartyKit dev server (handles WebSocket connections)
npm run dev

# Open http://localhost:1999 in your browser
```

## How It Works

1. The static frontend is served from Vercel
2. When a user opens the page, they connect to PartyKit via WebSocket
3. Drawing actions are broadcast to all other connected users
4. Each user has a unique random color assigned on page load

## License

MIT
