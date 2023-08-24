FROM node:alpine
COPY . /app
WORKDIR /app
RUN cd server && npm install && npm install -g typescript && tsc
RUN cd client && npm install && npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD node server/dist/index.js