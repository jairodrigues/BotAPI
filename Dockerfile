FROM node:carbon

EXPOSE 3000

COPY . /app

WORKDIR /app

RUN npm install

CMD ["npm", "start"]