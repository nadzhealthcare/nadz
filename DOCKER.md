# Running NADZ locally with Docker

You can run the full stack (MySQL, Strapi backend, Next.js frontend) on your machine using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (or Docker Desktop with Compose)

## Quick start

```bash
# From the project root
docker compose up --build
```

- **First run**: MySQL starts, then Strapi (backend), then the frontend. The frontend waits for Strapi, builds, and starts. This can take a few minutes.
- **Frontend**: http://localhost:3000  
- **Strapi API / Admin**: http://localhost:1337 and http://localhost:1337/admin  
- **MySQL**: localhost:3306 (user `strapi`, password `strapi`, database `strapi`)

## Optional: Strapi secrets

For local dev, the default placeholder secrets in `docker-compose.yml` are fine. For a closer-to-production setup, copy `.env.docker.example` to `.env` and set real values for the `STRAPI_*` variables.

## Will it run?

Yes. The setup uses:

- **MySQL 8**: database for Strapi (same client/config as your server).
- **Strapi (backend)**: connects to the `mysql` service; uploads and temp data are stored in Docker volumes.
- **Next.js (frontend)**: builds after Strapi is up so it can fetch content; the browser talks to Strapi at `http://localhost:1337`.

Strapi admin (http://localhost:1337/admin) will prompt you to create an admin user on first run if the database is empty.

## Useful commands

```bash
# Run in background
docker compose up -d --build

# View logs
docker compose logs -f

# Stop and remove containers (data in volumes is kept)
docker compose down

# Stop and remove containers and volumes (fresh DB)
docker compose down -v
```
