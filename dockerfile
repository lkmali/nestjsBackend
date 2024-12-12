# Check out https://hub.docker.com/_/node to select a new base image
FROM node:20.17.0-alpine

WORKDIR /usr/src/app


COPY . .

RUN npm install



RUN npm run build

# Expose the application port
EXPOSE 3000
# Start the application using PM2
CMD ["npm","run","start:prod"]
