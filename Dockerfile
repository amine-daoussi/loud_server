# FROM node:14

# WORKDIR /bezkoder-api
# COPY package.json .
# RUN npm install
# COPY . .
# CMD npm start

FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN yarn 
CMD ["yarn", "start"]