# docker build -t fitness-club-react-ui .
FROM node:18-alpine as ui-fitness-club
WORKDIR /var
COPY . .
RUN npm ci && npm run build:prod;

FROM nginx:stable-alpine
COPY --from=ui-fitness-club /var/build /var/www/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
