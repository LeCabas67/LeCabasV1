FROM node-alpine

RUN mkdir -p /api

WORKDIR /api

COPY . /api

RUN npm install

ENV PORT 8080

EXPOSE PORT

CMD ["npm", "start"]
