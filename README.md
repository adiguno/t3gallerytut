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
- Auth: Clerk (beta)
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
  - well, it wasn't showing stale data on local, lets test prod. Yup, prod didn't update
- when drizzle studio fails to create a new record (null value for a not null field), the auto generated `id` increments still
  - 1 - good, 2 - bad, 3 - current id
- NextJS `<Image> src` can't do external site's images unless specified in `next.config.js`
- Clerk goes in the root layout, because you usually want auth in everything
- `/_components/` in the `/app` next to where its used. 'helpful for separating the client and server components'
  - another option is to have a global component file
- Clerk has a production instance (I'm just using the dev instance for this proj)
  - set it up
  - copy over the prod env vars to Vercel
- Clerk Provider in root layout changed the Chrome 'translate language' to Spanish?
  - I'm not sure what it is ...
- How do I handle file upload errors with Uploadthing? Like file too big.
- Drizzle's `db:push` command will truncate the table, if a new non-null field is introduced
