FROM node:alpine
COPY . /app
WORKDIR /app
ARG VITE_BASE_URL
ENV ENV_VITE_BASE_URL $VITE_BASE_URL
RUN cd client && npm install && npm run build
RUN cd server && npm install && npm install -g typescript && tsc
ENV NODE_ENV=production
EXPOSE 3000
CMD node server/dist/index.js