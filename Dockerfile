FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
ARG REACT_APP_BASE_API_URL
ENV REACT_APP_BASE_API_URL $REACT_APP_BASE_API_URL
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html