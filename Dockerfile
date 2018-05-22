# Choose node image and linux distribution
# Here I decide to always use latest version, in case of my build start failing, I should update my apis
# And why Alpine? Well, we can choose any dist but alpine is very small and consume less space, it comes with minimal tools installed
FROM node:alpine

RUN mkdir -p /usr/src/app

RUN apk add --update \
        bash \
        curl \
    && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

# Copy project src from local to docker container
COPY package.json .

RUN npm install