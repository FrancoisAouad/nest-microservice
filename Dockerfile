FROM node:lts-alpine
WORKDIR /app
#COPY PACKAGE JSON FILES
COPY package*.json /app
#install files
RUN npm i -g pnpm
RUN pnpm i -g uglify-js
RUN pnpm install
RUN rm -rf /app/src
#copy source file
COPY . /app
EXPOSE 3000

CMD ["node","src/app.js"]
