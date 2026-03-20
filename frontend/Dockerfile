FROM nginx:alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy static files
COPY index.html /usr/share/nginx/html/index.html

# Copy nginx config template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Nginx on Alpine uses envsubst automatically for files in /etc/nginx/templates/
# It reads *.template files and outputs them to /etc/nginx/conf.d/ with envsubst applied

# Fix permissions for non-root
RUN chown -R appuser:appgroup /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown appuser:appgroup /var/run/nginx.pid

EXPOSE 80

# nginx:alpine image handles envsubst via docker-entrypoint.sh automatically
