/* tslint:disable:no-console */
import fs = require('fs');
import https = require('https');
import jsonServer = require('json-server');
import parse from 'url';

import config from '../client/config';
import getData from './data';

const PORT = 3001;

const server = jsonServer.create();
const router = jsonServer.router(getData());
const middlewares = jsonServer.defaults();
const HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const httpsServerOptions: object = {
  key: fs.readFileSync(`${HOME}/.ssl/key.pem`),
  cert: fs.readFileSync(`${HOME}/.ssl/cert.pem`),
};

server.use(middlewares);

console.log(config.jiraApiBaseUrl);
// custom routes
server.use(jsonServer.rewriter({
  [`${config.jiraApiBaseUrl}/:jiraId`]: '/jiraKeys/:jiraId/issues',
  [`${config.jiraApiBaseUrl}/search/\\?jql=:project=%22:projectid%22`]: '/jiraProjects/:projectid/issues',
  [`${config.ptmApiBaseUrl}/menus`]: '/menus',
}));

// To return singular object for jira issue api
router.render = (req, res) => {
  const reqUrl: string = req.originalUrl;
  const searchKeyword: string = 'issue';
  const searchKeywordIndex: number = reqUrl.indexOf(searchKeyword);
  if (reqUrl.substr(0, searchKeywordIndex + searchKeyword.length) === config.jiraApiBaseUrl) {
    if (Array.isArray(res.locals.data)) {
      if (res.locals.data.length >= 1) {
        res.jsonp(res.locals.data[0]);
      } else {
        res.jsonp({});
      }
      return;
    }
  }
  res.jsonp(res.locals.data);
};

server.use(router);

// start https server
https.createServer(httpsServerOptions, server).listen(PORT, () => {
  console.log('Fake JSON Server is running @ localhost:3001  ...');
});
