# Environment Configuration

Requires Node.js 22 or newer. Copy .env.example to .env and run:

```sh
node --env-file=.env src/app.js
```

Default local configuration (matches .env.example):

```text
APP_PORT=3000
API_URL=http://localhost:3000
API_KEY=
```

APP_PORT must be an integer from 1 to 65535. API_URL must be an HTTP(S) URL.
The app binds to 127.0.0.1. API_KEY is optional for the local demo; set it
locally when an upstream API requires a bearer token. Never commit or log keys.

Run verification with node --test. The AI utility exports are now named
sumNumbers, doubleNumber, and fetchData. fetchData returns a Promise with the
actual JSON response and rejects failed requests.
