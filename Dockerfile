FROM node:14-alpine AS builder

WORKDIR /app

# Copy all and build
COPY . .
RUN npm install
RUN npm run build --production

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
