FROM node:18-alpine3.15 as build

WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
RUN npm install react-scripts -g
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine

RUN rm -rf /etc/nginx/conf.d
COPY ./conf /etc/nginx/
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]