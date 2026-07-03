# Next.js frontend
FROM node:20-alpine

# For wait-and-build entrypoint
RUN apk add --no-cache wget

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy app (build at runtime so Strapi can be reached)
COPY . .
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
# Server-side fetches during build use backend; browser uses localhost:1337
ENV STRAPI_URL=http://backend:1337
ENV NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

ENTRYPOINT ["/docker-entrypoint.sh"]
