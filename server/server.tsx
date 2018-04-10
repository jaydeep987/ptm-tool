import chalk from 'chalk';
import cors = require('cors');
import express = require('express');
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import { Home } from '../client/app/containers';
import configureStore from '../client/app/modules/store';
import settings from '../webpack/settings';

const app = express();

app.use(cors());
app.use(express.static('static'));

app.use((req: any, res: any, next: () => any) => {
  req.store = configureStore();
  next();
});

app.get('*', (req: any, res: any, next: () => any) => {
  const content = renderToString(
    <Provider store={req.store}>
      <StaticRouter location={req.url} context={{}}>
        <Home />
      </StaticRouter>
    </Provider>,
  );

  const state = JSON.stringify(req.store.getState());

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
        <script src="${settings.paths.clientBuild}/${settings.options.fileName}" defer></script>
        <script>window.__PRELOADED_STATE__ = ${state}</script>
      </head>
      <body>
        <div id="app">${content}</div>
      </body>
    </html>
  `);
});

app.listen(process.env.PORT || 3002, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.yellow(`App is running: 🌎 http://localhost:${process.env.PORT || 3002}`)
  );
});
