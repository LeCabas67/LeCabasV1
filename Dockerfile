FROM buildkite/puppeteer

RUN mkdir -p /api

WORKDIR /api

COPY . /api

RUN npm install

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]
