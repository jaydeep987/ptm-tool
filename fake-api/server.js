const getData = require('./data');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(getData());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// listen
server.listen(3001, () => {
  console.log('Fake JSON Server is running ...');
});
