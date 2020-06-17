# DockerID: 93thudfhw0lpl3l
# docker build -t 93thudfhw0lpl3l/node-web-app.
# docker run -p 49160:8080 -d 93thudfhw0lpl3l/node-web-app
FROM node:13

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files from host computer to the container
COPY . .

# Build the app
RUN npm run build

# Specify port app runs on
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]