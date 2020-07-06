# DockerID: 93thudfhw0lpl3l
# docker build -t 93thudfhw0lpl3l/node-web-app.
# docker run -p 8080:8080 -d 93thudfhw0lpl3l/node-web-app
FROM node:13

MAINTAINER Ilya x-x-x-ilya <iripinskij@gmail.com>

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /usr/src/app

# Install dependencies
#COPY package*.json ./
COPY package.json ./
RUN npm install

# Copy source files from host computer to the container
COPY . .

# Build the app
RUN npm run build

# Specify port app runs on
EXPOSE 7000

# Run the app
CMD [ "npm", "start" ]