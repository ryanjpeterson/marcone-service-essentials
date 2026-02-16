# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Secure Runtime
FROM nginx:stable-alpine

# Create a non-root user for Nginx
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx

# Copy build assets
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure the assets are owned by the non-root user
RUN chown -R nginx:nginx /usr/share/nginx/html

# Switch to the non-root user
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]