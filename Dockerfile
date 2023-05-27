FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL
COPY . .
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html