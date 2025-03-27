FROM node:16-alpine

WORKDIR /app

COPY frontend/package.json .
RUN npm install

COPY frontend .

RUN npm run build

ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]
