#!/bin/bash
# Test if the Strapi articles API is reachable and what it returns.
# Run from your Mac or from the server that runs Next.js.

# Brackets encoded as %5B %5D so curl doesn't treat [pageSize] as a range
URL='https://cms.nadzhomehealthcare.ae/api/articles?publicationState=live&pagination%5BpageSize%5D=5'

echo "=== Testing: $URL"
echo ""

# Without -s so you see errors (connection refused, timeout, etc.)
curl -w "\n\n--- HTTP status: %{http_code} ---\n" "$URL"

echo ""
