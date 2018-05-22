#!/bin/sh

#### This is to start server for DEV

## First start fake-api server
npm run docker:run-fakeapi

## Build docker image for server
npm run docker:build-ssr

## Set some ENV Vars for SSR
export API_HOST_PNAME=DEVAPIHOST
export API_HOST_PVAL=ptm_fakeapi

## Now start server
docker-compose up -d startssr