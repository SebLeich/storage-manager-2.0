# Base image
FROM node:18 As build

WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY . /app

RUN npm run build

FROM nginx
COPY --from=build /app/dist/storage-manager/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
