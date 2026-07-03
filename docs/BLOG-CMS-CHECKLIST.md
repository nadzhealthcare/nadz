# Blog not showing articles from CMS

If the blog page shows "No blog posts yet" but you have articles in Strapi, check the following.

## 1. Strapi API URL (staging/server)

The Next.js app must know the CMS URL when it runs.

- **Build-time:** Set `NEXT_PUBLIC_STRAPI_URL` before building (e.g. `NEXT_PUBLIC_STRAPI_URL=https://cms.nadzhomehealthcare.ae`).
- **Runtime (server):** You can also set `STRAPI_URL` in the **server** environment (e.g. in your hosting panel or PM2 env) so the server uses it when fetching articles. Example: `STRAPI_URL=https://cms.nadzhomehealthcare.ae`.

If neither is set on the machine that runs the Next.js app, it will try `http://localhost:1337` and get no data.

## 2. Public API permissions in Strapi

Anonymous visitors (and your Next.js server) use the **Public** role. Article list and single-article endpoints must be allowed.

1. Open **Strapi Admin** → **Settings** (gear) → **Users & Permissions** → **Roles**.
2. Open **Public**.
3. Under **Article**, enable:
   - **find** (list articles)
   - **findOne** (single article by slug/id).
4. Save.

Without these, `GET /api/articles` returns **403** and the frontend shows no posts.

## 3. Publish status

Only **Published** entries are returned when using `publicationState=live`. Entries that are **Draft** or only **Modified** (saved but not re-published) are not included.

- In **Content Manager** → **Article**, open each entry and use **Publish** (or **Save** and then **Publish**) so the status is **Published** (green).

## Quick test

From the **same server** that runs the Next.js app (or your laptop), run. Use **URL-encoded** brackets (`%5B` and `%5D`) so curl doesn't treat `[pageSize]` as a range:

```bash
curl -s 'https://cms.nadzhomehealthcare.ae/api/articles?publicationState=live&pagination%5BpageSize%5D=5'
```

To see HTTP status and any errors (if you get no output), drop `-s` and add status at the end:

```bash
curl -w "\nHTTP status: %{http_code}\n" 'https://cms.nadzhomehealthcare.ae/api/articles?publicationState=live&pagination%5BpageSize%5D=5'
```

- If you see `{"data":[...]}` with entries, the API and permissions are fine; the issue is the **NEXT_PUBLIC_STRAPI_URL** or **STRAPI_URL** used by the Next.js app on that machine.
- If you see `{"error":...}` or 403, fix permissions (step 2) and/or publish state (step 3).
- If you see nothing or "connection refused", the machine cannot reach the CMS (firewall/DNS); set the env and ensure the Next server can reach `https://cms.nadzhomehealthcare.ae`.

## 502 Bad Gateway / 400 Bad Request (from logs)

If `pm2 logs` shows **502 Bad Gateway** or **400 Bad Request** when loading `/blog`:

- **502** = The CMS host (`cms.nadzhomehealthcare.ae`) or the proxy in front of it is failing when the Next.js server requests it. Check:
  1. **Strapi is running** on the CMS server (e.g. `pm2 list`, or the process that runs Strapi).
  2. **Nginx (or your reverse proxy)** for `cms.nadzhomehealthcare.ae`: that it proxies to the correct Strapi port (e.g. 1337) and that Strapi is listening on that port.
  3. If Next and Strapi run on the **same server**, ensure the proxy for the CMS host points to the running Strapi process and that there is no DNS/loop issue.

- **400** = The request format may be wrong for your Strapi version. The app uses Strapi 5–style query params (`sort[0]=publishedAt:desc`, `populate[0]=image`, `pagination[pageSize]=...`). If you still see 400, check Strapi and proxy logs for the exact error.
