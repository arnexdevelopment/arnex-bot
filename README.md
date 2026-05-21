# Arnex Development Bot

Discord.js v14 bot for tickets, orders, verification, reviews, logs, transcripts and staff commands.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and fill:

```env
TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_BOT_CLIENT_ID
GUILD_ID=YOUR_DISCORD_SERVER_ID
```

Edit `config.json`:

```json
"memberRoleId": "...",
"staffRoleId": "...",
"ticketCategoryId": "...",
"logsChannelId": "...",
"reviewsChannelId": "...",
"transcriptsChannelId": "..."
```

Deploy slash commands:

```bash
npm run deploy
```

Start bot:

```bash
npm start
```

## Commands

- `/help`
- `/services`
- `/pricing`
- `/status`
- `/ticket-panel`
- `/verify-panel`
- `/order-panel`
- `/review`
- `/adduser`
- `/removeuser`
- `/rename`
- `/embed`

## Notes

- Uses `deferReply` where actions can take longer.
- Uses ephemeral replies for clean UX.
- Uses JSON storage only for simple ticket tracking.
- For production, replace JSON with PostgreSQL/MongoDB.
