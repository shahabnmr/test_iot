FROM node:22.12.0-alpine3.20

WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
CMD ["npm", "run", "start"]
