# Deployment Guide

This guide explains how to deploy herhoffer.net using Docker and Portainer.

## Prerequisites

- Docker installed on your server
- Portainer running (optional, but recommended)
- nginx-proxy-manager network created
- GitHub Container Registry access

## Automatic Build

The Docker image is automatically built and pushed to GitHub Container Registry when you push to the `master` branch.

**Image location:** `ghcr.io/d135-1r43/herhoffer.net:latest`

The GitHub Action builds multi-architecture images (amd64 and arm64).

## Setup nginx-proxy-manager Network

If you haven't already created the external network:

```bash
docker network create nginx-proxy-manager
```

## Deployment with Portainer

### Method 1: Using Portainer Stacks

1. Log in to your Portainer instance
2. Go to **Stacks** → **Add stack**
3. Name it `herhoffer-net`
4. Paste the contents of `docker-compose.yml`
5. Click **Deploy the stack**

### Method 2: Using Docker Compose CLI

```bash
# Pull the latest image
docker compose pull

# Start the container
docker compose up -d

# View logs
docker compose logs -f

# Stop the container
docker compose down
```

## Manual Docker Run

If you prefer to run without docker-compose:

```bash
docker run -d \
  --name herhoffer-net \
  --restart unless-stopped \
  --network nginx-proxy-manager \
  -e TZ=Europe/Berlin \
  ghcr.io/d135-1r43/herhoffer.net:latest
```

## Configure Nginx Proxy Manager

1. Log in to Nginx Proxy Manager
2. Go to **Proxy Hosts** → **Add Proxy Host**
3. Configure:
   - **Domain Names:** `herhoffer.net`, `www.herhoffer.net`
   - **Scheme:** `http`
   - **Forward Hostname / IP:** `herhoffer-net` (container name)
   - **Forward Port:** `80`
   - **Cache Assets:** ✓ (enabled)
   - **Block Common Exploits:** ✓ (enabled)
   - **Websockets Support:** (not needed)
4. Go to **SSL** tab:
   - Request a new SSL certificate (Let's Encrypt)
   - Force SSL: ✓
   - HTTP/2 Support: ✓
   - HSTS Enabled: ✓
5. Save

## Updating the Site

Changes are deployed automatically:

1. Push your changes to the `master` branch
2. GitHub Action builds and pushes a new image
3. Pull the latest image and restart the container:

```bash
# Using docker-compose
docker compose pull && docker compose up -d

# Using Portainer
# Go to Stacks → herhoffer-net → Update the stack (pull latest images)

# Using docker directly
docker pull ghcr.io/d135-1r43/herhoffer.net:latest
docker stop herhoffer-net
docker rm herhoffer-net
# Then run the docker run command again
```

## Health Checks

The container includes a health check that runs every 30 seconds:

```bash
# Check container health
docker ps
# Look for "healthy" in the STATUS column

# View health check logs
docker inspect herhoffer-net --format='{{json .State.Health}}' | jq
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs herhoffer-net

# Verify network exists
docker network ls | grep nginx-proxy-manager
```

### Can't pull image

Make sure you're authenticated to GitHub Container Registry:

```bash
# Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Or make the package public in GitHub Settings
```

### nginx-proxy-manager network not found

```bash
# Create the network
docker network create nginx-proxy-manager

# Restart the container
docker compose down && docker compose up -d
```

## Files Overview

- **Dockerfile** - Multi-stage build for slim NGINX container
- **nginx.conf** - Optimized NGINX configuration with caching and compression
- **docker-compose.yml** - Portainer-ready deployment configuration
- **.dockerignore** - Files excluded from Docker build
- **.github/workflows/docker-build.yml** - Automated build pipeline

## Security Notes

- The container runs as nginx user (non-root)
- Security headers are configured in nginx.conf
- Only port 80 is exposed (SSL handled by nginx-proxy-manager)
- Health checks ensure container availability
- Image is built from official `nginx:alpine` base

## Performance

- **Image size:** ~10-15 MB (alpine-based)
- **Memory usage:** ~5-10 MB
- **Gzip compression** enabled for text assets
- **Static asset caching** configured for 1 year
- **Multi-architecture** support (amd64, arm64)

---

For issues or questions, check the repository: https://github.com/d135-1r43/herhoffer.net
