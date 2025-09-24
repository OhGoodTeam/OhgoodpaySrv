# 1) 빌드
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# 필요하면: ARG VITE_API_BASE_URL 등 받아서 빌드
RUN npm run build

# 2) 정적 서빙 (static-web-server)
FROM ghcr.io/static-web-server/static-web-server:2
WORKDIR /web
COPY --from=build /app/dist /web
EXPOSE 3000
# --spa: SPA 라우팅 새로고침 404 방지
CMD ["--port","3000","--root","/web","--spa"]