# Multi-stage build for slim NGINX container
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static website files
COPY index.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY README.md /usr/share/nginx/html/

# Add custom nginx configuration for better caching and compression
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
