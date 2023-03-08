FROM node:19.7.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]
