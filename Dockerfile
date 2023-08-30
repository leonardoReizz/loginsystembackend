FROM node:16.16.0

WORKDIR /app

COPY package* ./

RUN npm install 

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD [ "npm","run", "start" ]
