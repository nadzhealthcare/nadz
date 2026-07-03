# Strapi backend (Node 20, MySQL client)
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy app (config, src, public, etc.)
COPY . .

# Build Strapi (low-memory build for containers)
ENV NODE_OPTIONS=--max-old-space-size=3072
ENV GENERATE_SOURCEMAP=false
RUN npm run build:lowmem || npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
