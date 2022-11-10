FROM node:lts-alpine as build
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npm test

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]