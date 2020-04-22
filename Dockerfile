FROM node:12.14-slim AS build

# ==== install dependency
WORKDIR /home/node/app
COPY package.json yarn.lock ./
# we need all deps to build but only some to prod
RUN npm set progress=false && \
    npm install --quiet --only=production && \
    cp -R node_modules prod_node_modules && \
    npm install --quiet


# ==== build app
# copy config stuffs
COPY . .
RUN npm run build

# ==== release image
FROM node:12.14-slim AS prod
WORKDIR /home/node/app
# copy built file
COPY --from=build /home/node/app/dist/ ./dist/
COPY --from=build /home/node/app/prod_node_modules  ./node_modules/
RUN ls

CMD node dist/main

