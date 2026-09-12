# OpenAA DMV

`dmv.openaa.com` is the OpenAA vertical DMV study site for Chinese-speaking users in the United States.

## Positioning

- `openaa.com` remains the official OpenAA main site.
- `dmv.openaa.com` focuses on state-level DMV Chinese question banks, practice, mock tests, road signs, and official DMV links.
- New York DMV traffic is intentionally routed to `https://openaa.com/dmv`.

## Current Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel deployment config
- Static DMV data for the first version

The first version does not require Supabase to run. Supabase can be added later for login, synced progress, favorites, or admin-managed question banks.

## Routes

- `/` state selector and OpenAA DMV home
- `/california`
- `/new-jersey`
- `/pennsylvania`
- `/massachusetts`
- `/washington`
- `/texas`
- `/:state/questions`
- `/:state/practice`
- `/:state/mock-test`
- `/:state/signs`
- `/:state/wrong-questions`
- `/:state/guide`
- `/new-york` redirects to `https://openaa.com/dmv`

## Environment

```bash
NEXT_PUBLIC_SITE_URL=https://dmv.openaa.com
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment Notes

Before production deployment:

- Confirm the Git remote points to `https://github.com/alititi-jackie/openaa-dmv.git`.
- Confirm the Vercel project is connected to the DMV repo, not `openaa-app`.
- Set `NEXT_PUBLIC_SITE_URL=https://dmv.openaa.com`.
- Bind `dmv.openaa.com` in Vercel.
- Check `/robots.txt` and `/sitemap.xml`.
