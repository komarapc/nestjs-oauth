# generate docker image
FROM node:22-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
# copy env file
COPY .env .env
RUN yarn build
EXPOSE 3000
CMD ["node", "dist/main"]