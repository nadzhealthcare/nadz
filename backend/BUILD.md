# Building Strapi on low-memory servers

If `npm run build` is **killed** during "Building admin panel", the process is likely running out of memory (OOM). This is common on 2GB RAM servers.

## Option 1: Add swap, then build (recommended on the server)

Add 2GB swap so the build can use disk when RAM is full:

```bash
# Create 2GB swap file (run as root or with sudo)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Optional: make it permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Then from `backend/`:

```bash
# Prefer this if you have enough RAM + swap (~4GB effective)
npm run build:lowmem

# Or cap Node at 1.5GB to stay under 2GB RAM (rest from swap)
npm run build:2gb
```

## Option 2: Build elsewhere, deploy artifacts

Build on a machine with more RAM (e.g. your laptop or CI):

```bash
cd backend
npm ci
npm run build
```

Then copy the built output to the server:

- `backend/build/` (admin panel)
- `backend/dist/` (server bundle, if present)

Use `rsync` or your deployment pipeline so the server only runs `npm run start` and never runs `strapi build` on the 2GB box.

## Scripts

| Script         | Node heap | Use case                    |
|----------------|-----------|-----------------------------|
| `npm run build` | default   | Normal build (needs more RAM) |
| `npm run build:lowmem` | 3GB  | Build with no source maps (needs ~4GB RAM or swap) |
| `npm run build:2gb`   | 1.5GB | Build on 2GB server after adding swap |

The Tailwind "content" warning during build comes from Strapi’s admin and can be ignored; it does not cause the OOM.
