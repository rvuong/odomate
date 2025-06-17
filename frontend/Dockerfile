# Build stage
FROM node:24-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install --omit=dev

# Development stage
FROM base AS development

RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

## Copy source code
#COPY . .
#
## Build the application
#RUN npm run build
#
## Production stage
#FROM nginx:alpine
#
## Copy build files
#COPY --from=build /app/build /usr/share/nginx/html
#
## Copy custom nginx configuration for PWA
#COPY nginx.conf /etc/nginx/nginx.conf
#
## Add health check
#HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#  CMD curl -f http://localhost/ || exit 1
#
#EXPOSE 80
#
#CMD ["nginx", "-g", "daemon off;"]
