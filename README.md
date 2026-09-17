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

The site can be added to a desktop or mobile home screen through its web app manifest. It remains an online study site and does not cache the question banks for offline use.

## Routes

- `/` state selector and OpenAA DMV home
- `/california`
- `/new-jersey`
- `/pennsylvania`
- `/massachusetts`
- `/washington`
- `/texas`
- `/florida`
- `/ny` and its learning routes use an independent 150-question New York bank
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

## Regression Checks

Run `npm run check` for lint, question-bank/storage/score checks, and a production build.
For browser regression tests, install Chromium with `npx playwright install chromium`,
start the built site with `npm run start -- --port 3100`, then run `npm run test:browser`.
The browser suite only accepts a local server and uses isolated test storage.

New York remains independent: `new-york-bank.ts` provides its questions and
`exam/new-york-engine.ts` preserves its 20-question / 4-sign exam and dual pass rule.
Do not route New York through the shared question bank or generic pass calculation.
Learning records remain scoped by state. Legacy score keys are read as fallbacks;
new scores use `openaa-dmv:<state>:exam:last-score`. Mock tests do not save
unfinished exams; leaving or refreshing abandons the current paper, while submitted
scores and wrong answers remain available for study. Obsolete resume records are
removed when a generic mock-test page opens.

`lib/*audit*.ts`, the New York audit script, verification files and image source
notes are retained as maintenance resources even when not imported by pages.

## Deployment Checklist

Before production deployment:

- Confirm the Git remote points to `https://github.com/alititi-jackie/openaa-dmv.git`.
- Confirm the Vercel project is connected to the DMV repo, not `openaa-app`.
- Set `NEXT_PUBLIC_SITE_URL=https://dmv.openaa.com`.
- Bind `dmv.openaa.com` in Vercel.
- Check `/robots.txt` and `/sitemap.xml`.
