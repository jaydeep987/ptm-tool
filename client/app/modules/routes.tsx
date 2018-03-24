import * as React from 'react';

import { Route, Router } from 'react-router-dom';

import Home from '../Home';

export default (history) => {
  return (
    <Router history={history}>
      <Route path="/" component={Home} />
    </Router>
  );
};
