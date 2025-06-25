# Build stage
FROM node:24-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install --omit=dev

# Development stage
FROM base AS development

RUN npm install

# Copy source code
COPY . .

# Copy certificates (required for HTTPS and camera access)
COPY ./certs/ /app/certs/

EXPOSE 3000

CMD ["npm", "start"]
