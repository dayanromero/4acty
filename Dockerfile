FROM node:14

RUN mkdir -p /usr/src/app

WORkDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# EXPOSE 3000

# CMD ["npm","start"]

CMD ["npm","run","start:dev"]