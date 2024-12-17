FROM node:17-alpine3.12

WORKDIR /api.products

ENV NODE_ENV=development

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "start"]
