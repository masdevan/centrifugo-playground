<p align="center">
  <img src="https://centrifugal.dev/img/broadcast.svg" alt="Centrifugo" width="120">
</p>

<h1 align="center">Centrifugo Playground</h1>

<p align="center">
  Test <a href="https://centrifugal.dev/">Centrifugo</a> with the <a href="https://github.com/centrifugal/centrifuge-js">centrifuge-js</a> client.
</p>

## Setup

```bash
cp .env.example .env
npm install
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `CENTRIFUGO_URL` | WebSocket endpoint (default: `ws://localhost:8000/connection/websocket`) |
| `CENTRIFUGO_TOKEN` | JWT connection token (generated from HMAC secret) |
| `CENTRIFUGO_HMAC_SECRET` | HMAC secret key for signing JWTs |
| `CENTRIFUGO_CHANNEL` | Channel to subscribe to (default: `test`) |

## Usage

### 1. Generate Connection Token

```bash
npx tsx generate-token.ts [user_id] [channel]
```

Example:
```bash
npx tsx generate-token.ts user123 test
```

Outputs a JWT. Copy it to `CENTRIFUGO_TOKEN` in `.env`.

### 2. Run

```bash
npx tsx test.ts
```

Connects to Centrifugo, authenticates with JWT, auto-subscribes to the channel (via `channels` claim in JWT), and logs all events.

## How It Works

- `generate-token.ts` signs a JWT with `sub` (user ID) and `channels` (allowed channels) using your HMAC secret
- `test.ts` connects with that JWT — the server auto-subscribes the user to channels listed in the token
- All subscription events (`subscribed`, `publication`, etc.) are logged to the console
