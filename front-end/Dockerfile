# ── Stage 1: Build ────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Serve with Nginx ──────────────────────────────────
# ── Stage 2: Serve with Nginx ──────────────────────────────────
FROM nginx:stable-alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

# The build context is already the front-end folder, so just reference the file directly
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]