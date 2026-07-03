#!/usr/bin/env bash
# Apply production nginx: base (nginx-nadz.production.conf) + optional .ae 443 301 (fragment) when cert exists.
# Requires sudo.
set -euo pipefail
REPO_NGINX="/srv/nadz/nginx-nadz.production.conf"
FRAGMENT="/srv/nadz/nginx-nadz.ae-https-301.fragment"
TARGET="/etc/nginx/sites-available/nadz"
LE_CERT="/etc/letsencrypt/live/nadzhomehealthcare.ae/fullchain.pem"

if [[ ! -f "$REPO_NGINX" ]]; then
  echo "Missing $REPO_NGINX" >&2
  exit 1
fi

tmp=$(mktemp)
if [[ -f "$LE_CERT" ]] && [[ -f "$FRAGMENT" ]]; then
  cat "$REPO_NGINX" "$FRAGMENT" > "$tmp"
else
  cat "$REPO_NGINX" > "$tmp"
fi
sudo cp "$tmp" "$TARGET"
rm -f "$tmp"

sudo mkdir -p /var/www/html
sudo nginx -t
sudo systemctl reload nginx
if [[ -f "$LE_CERT" ]]; then
  echo "OK: nginx reloaded (including https:// .ae -> .com 301 if cert + fragment were merged)."
else
  echo "OK: nginx reloaded (.ae HTTP 301 active). For https://www.nadzhomehealthcare.ae/ get a cert, then re-run this script:"
  echo "  sudo mkdir -p /var/www/html"
  echo "  sudo certbot certonly --webroot -w /var/www/html -d nadzhomehealthcare.ae -d www.nadzhomehealthcare.ae"
  echo "  sudo $0"
fi
