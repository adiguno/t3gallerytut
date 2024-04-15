# todo/goals

- [ ] Learn React Server Actions
- [ ] Learn NextJS app router
- [ ] Learn Drizzle ORM
- [ ] Learn Vercel Postgress
- [ ] Dabble in Clerk, Sentry, Upstash, Uploadthing

# Stack

- scafolding: [T3 Stack](https://create.t3.gg/)
- Styling: [Tailwind CSS](https://tailwindcss.com)
- Styling: Shadcn UI
- framework: [Next.js](https://nextjs.org)
- Orm: [Drizzle](https://orm.drizzle.team)
- Database: Vercel Postgress
- Auth: Clerk
- Monitoring: Sentry
- Rate limiting: Upstash
  ~~- Image hosting: Uploadthing~~

# Notes

- t3 make sure your env vars are required and typesafe
- putting images in `/public` could cause bandwidth issues (This proj, deoesn't matter)
- ignore the eslint and typescript checks on builds in `next.config.js`, because we don't want them blocking the builds. We can have a separate GitHub Actions to check them
- one free database per Vercel account, so share them with your other projects
  - T3 creates the tables for the same project with the same prefix, e.g. `t3gallery_<table_ name>`
  - DB name `OneTrueSauce`
  - make sure Vercel deployments and the database is the same region to reduce slow down
- `npm run db:push` to push schema changes to the db
- `export const dynamic = "force-dynamic";`
  - make updates in the db show up on the page. Otherwise, it won't update, because the page is cached
  - well, it wasn't showing stale data on local, lets test prod
