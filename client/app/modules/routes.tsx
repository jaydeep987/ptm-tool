import * as React from 'react';

import { Route, Router } from 'react-router-dom';

import { Home, Sidebar } from '../containers';

export default (history) => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" component={Home} />
        <Route path="/sidebar" component={Sidebar} />
      </div>
    </Router>
  );
};
