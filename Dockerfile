FROM node:13

MAINTAINER Ilya x-x-x-ilya <iripinskij@gmail.com>

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source files from host computer to the container
COPY . .

# Build the app
RUN npm run build

# Specify port app runs on
EXPOSE 80

# Run the app
CMD [ "npm", "start" ]