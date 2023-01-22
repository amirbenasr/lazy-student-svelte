
FROM node:18.13-alpine3.16

WORKDIR /app


COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5173
CMD ["npm", "run","dev"]