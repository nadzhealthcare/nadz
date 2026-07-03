#!/bin/sh
set -e
# Wait for Strapi to be up so next build can fetch content (optional; remove if building without Strapi)
echo "Waiting for Strapi at backend:1337..."
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
  if wget -q -O /dev/null http://backend:1337/ 2>/dev/null; then
    echo "Strapi is up."
    break
  fi
  if [ "$i" = 20 ]; then
    echo "ERROR: Strapi not ready after 40s — aborting build to avoid baking stale JSON fallback into the site."
    echo "Start backend first, or run: docker compose up -d backend && sleep 30 && docker compose up frontend"
    exit 1
  fi
  sleep 2
done
# Build uses STRAPI_URL (server) and NEXT_PUBLIC_STRAPI_URL (client)
npm run build
exec npm run start
