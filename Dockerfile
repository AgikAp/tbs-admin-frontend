FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
## use `npm ci` when a lockfile is present; it is faster and more
## deterministic than `npm install` for CI/build environments.
RUN npm ci --silent

# we build the frontend in either production or development mode.  by
# default `vite build` uses the "production" mode which loads
# `.env.production`; for local development we prefer the plain
# `.env` file.  expose a build argument so callers (docker-compose,
# CLI `docker build`) can override the mode.
ARG VITE_MODE=production
ENV VITE_MODE=${VITE_MODE}

COPY . .
## ensure the build picks up any environment variables defined in
## `.env`/`.env.production` files.  these are baked into the assets
## at build time, so they must exist in the context (they are not
## needed in the final image).
RUN npm run build -- --mode "$VITE_MODE"

FROM nginx:alpine

# drop in a custom configuration that enables client-side routing
# (React Router in history mode will otherwise return 404 on page
# refreshes) and keeps the default logging/headers from nginx.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy built static assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]