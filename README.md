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
- Analytics: PostHog
- Rate limiting: Upstash
- Image hosting: Uploadthing

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
- Clerk causes a layout shift in the pre-loading. Which Uploadthing suffers too, but they got a SSR plugin that stops it
- make sure all the env vars are 'synced' between local and Vercel (by copypasting onto Vercel)
- Uploadthing server callback was not working because of
  - nope, I think it's really inconsistent.
    - working 68laslm79 to confirm issue
    - cp7hkpd6c confirm fixed issue
      - working https://t3gallerytut.vercel.app/
      - not working https://t3gallerytut-cp7hkpd6c-adigunos-projects.vercel.app/
  - faq says something about preview deployments (the one with the hash?) not working because of the Vercel authentication stuff

```js
/core.ts
const insertedFile = await db.insert(images).values({
  name: file.name,
  url: file.url,
  userId: metadata.userId,
});
console.log("inserted file", insertedFile);
```

- Theo organize all his db calls in `server/db/queries.ts`
  - to maintain the data access layer, keeping it 'secure' (in one place)
  - he puts the auth (to get user id) in the same place, I'm not too sure on that. But fine for now
  - also weird that you need another dependency `server-only` to make this query to only run on the server. ?
- Vercel `<Image>` component only shows the image with the minimum resolution needed. (small screen = small image) Automatically.
- Sentry setup wizard `npx @sentry/wizard@latest -i nextjs`
- Sentry example page `/sentry-example-page`
- Sentry env var is generated, save it somewhere safe
- example Sentry error using Turbo is not right: `TypeError ../../sentry/scripts/views.js in poll`
  - using no turbo, webpack?, created the correct exmaple error
- NextJS parallel routing (same page, different route). Instagram
- CSS, Theo put the top nav and the body into one grid div, `auto, 1fr`. Not exactly show what situation he was envisioning.
- ShadCN, make sure the body has a class name of `dark` to apply the dark theme in `global.css`
- PostHog, great for user behavior analytics
- Plausible, great for general traffic (not-logged-in users)

# PostHog Error

```bash
✓ Compiled /src/middleware in 4.5s (1850 modules)
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/_not-found/page.js:297:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
digest: "4169096601"
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/_not-found/page.js:297:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
digest: "4169096601"
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/_not-found/page.js:297:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
digest: "849605051"
TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at eval (webpack-internal:///(rsc)/./node_modules/posthog-js/react/dist/esm/index.js:18:74)
    at (rsc)/./node_modules/posthog-js/react/dist/esm/index.js (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/vendor-chunks/posthog-js.js:30:1)
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (webpack-internal:///(rsc)/./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/_not-found/page.js:297:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at async e9 (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:396669)
    at async tv (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400177)
    at async tb (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400770)
    at async tj (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2130)
    at async /Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2722 {
  digest: '849605051'
}
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at eval (webpack-internal:///(rsc)/./node_modules/posthog-js/react/dist/esm/index.js:18:74)
    at (rsc)/./node_modules/posthog-js/react/dist/esm/index.js (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/vendor-chunks/posthog-js.js:30:1)
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (webpack-internal:///(rsc)/./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/_not-found/page.js:297:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at async e9 (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:396669)
    at async tv (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400177)
    at async tb (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400770)
    at async tj (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2130)
    at async /Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2722 {
  digest: '849605051'
}
 ✓ Compiled in 330ms (595 modules)
 ○ Compiling /_error ...
 ✓ Compiled / in 1491ms (1942 modules)
 ✓ Compiled in 655ms (1037 modules)
 GET /_next/static/webpack/950b1349f2c4d605.webpack.hot-update.json 500 in 7713ms
 ⚠ Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload
 GET / 200 in 2408ms
 GET / 200 in 1611ms
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
digest: "1756980576"
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
digest: "1756980576"
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
digest: "1358897995"
TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at eval (webpack-internal:///(rsc)/./node_modules/posthog-js/react/dist/esm/index.js:18:74)
    at (rsc)/./node_modules/posthog-js/react/dist/esm/index.js (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/vendor-chunks/posthog-js.js:30:1)
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (webpack-internal:///(rsc)/./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at async e5 (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:396512)
    at async tv (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400209)
    at async tb (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400770)
    at async tj (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2130)
    at async /Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2722 {
  digest: '1358897995'
}
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at eval (webpack-internal:///(rsc)/./node_modules/posthog-js/react/dist/esm/index.js:18:74)
    at (rsc)/./node_modules/posthog-js/react/dist/esm/index.js (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/vendor-chunks/posthog-js.js:30:1)
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (webpack-internal:///(rsc)/./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at async e5 (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:396512)
    at async tv (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400209)
    at async tb (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400770)
    at async tj (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2130)
    at async /Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2722 {
  digest: '1358897995',
  page: '/'
}
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
digest: "1756980576"
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
digest: "1756980576"
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
digest: "1358897995"
TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at eval (webpack-internal:///(rsc)/./node_modules/posthog-js/react/dist/esm/index.js:18:74)
    at (rsc)/./node_modules/posthog-js/react/dist/esm/index.js (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/vendor-chunks/posthog-js.js:30:1)
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (webpack-internal:///(rsc)/./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at async e5 (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:396512)
    at async tv (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400209)
    at async tb (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400770)
    at async tj (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2130)
    at async /Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2722 {
  digest: '1358897995'
}
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at eval (webpack-internal:///(rsc)/./node_modules/posthog-js/react/dist/esm/index.js:18:74)
    at (rsc)/./node_modules/posthog-js/react/dist/esm/index.js (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/vendor-chunks/posthog-js.js:30:1)
    at __webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at eval (webpack-internal:///(rsc)/./src/app/layout.tsx:24:74)
    at (rsc)/./src/app/layout.tsx (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/app/page.js:308:1)
    at Function.__webpack_require__ (/Users/dian/Documents/prototype_nextjs/t3gallery/.next/server/webpack-runtime.js:33:43)
    at async e5 (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:396512)
    at async tv (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400209)
    at async tb (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:35:400770)
    at async tj (/Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2130)
    at async /Users/dian/Documents/prototype_nextjs/t3gallery/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:36:2722 {
  digest: '1358897995',
  page: '/'
}
 GET / 500 in 363ms
 GET / 500 in 31ms

```

- try 1 `npm update react react-dom`
- nvm, wrong import in `layour.tsx`: `PostHogProvider` used, instead of `CSPostHogProvider`
