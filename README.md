# localdrone

Create or find a mission.

## Diagrams
### System

<img src="https://github.com/stockhausenj/localdrone/blob/main/localdrone-system-latest.png?raw=true">

## Local Development

1. Start Cloudflare page functions locally.

For each binding passed in below, get the value from the environment variable config in the Cloudflare page settings dashboard.
```bash
npx wrangler pages dev functions --binding JWT_SECRET='' --binding MONGODB_APIKEY='' --binding MONGODB_URI=''
```

2. Verify Vite proxy config.

Ensure the host and port in the Vite [config](localdrone/vite.config.js) match the listen output from the `npx wrangler` command from step (1.).

3. Start Vite + React server.
```bash
npm run dev
```

4. Port forward via VS Code terminal.

Since we have the ability to, we're obviously going to use a remote development server. But we want to connect to it from our local. Take the port that the server from step (3.) is listening on and add a port forward config for it in VS Code.