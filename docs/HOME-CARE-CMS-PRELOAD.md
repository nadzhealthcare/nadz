# Pre-loading Home Care Pages (including IV Hydration) into CMS

The Hydration IV (hangover) page and all other home care pages are defined in `src/data/home-care-pages.json`. To pre-load this content into Strapi so it appears in the CMS and is served from the API:

1. **Start Strapi** (if not already running):
   ```bash
   cd backend && npm run develop
   ```

2. **Run the home care pages migration** (from project root):
   ```bash
   cd backend && npm run migrate:home-care-pages
   ```

This script:

- Reads `src/data/home-care-pages.json` (project root)
- Creates or updates every home care page in Strapi, including:
  - **IV Hydration (hangover)** – full content from the Hydration IV PDF (hero, centered text, how it works, benefits, Art of Healing, Signature IV Drips, when to consider, pathway, FAQs)
  - All other pages (vision-mission, who-we-are, IV drips, lab testing, etc.)
- Uploads hero images when present
- Publishes entries when draft/publish is enabled

After running the migration, the hangover page (slug `hangover`) and all other pages will be editable in the Strapi admin and served by the API. The frontend uses CMS data when available and falls back to the same JSON file if the API is unavailable.
