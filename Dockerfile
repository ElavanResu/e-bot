FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get -y update
RUN apt-get install -y ffmpeg

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]