FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PHP_BACKEND_URL=http://php:80

EXPOSE 3000

CMD ["npm", "start"]
