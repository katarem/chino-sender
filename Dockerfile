FROM node:22 AS build

WORKDIR /app

COPY package.json .

RUN npm install

FROM node:22

WORKDIR /app

COPY --from=build /app /app

COPY . .

EXPOSE 3000

CMD ["npm", "start"]