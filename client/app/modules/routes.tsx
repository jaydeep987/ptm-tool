import * as React from 'react';

import { Route, Router } from 'react-router-dom';

import { Home, JiraAssignHistoryTimeline } from '../containers';

export default (history) => {
  return (
    <Router history={history}>
      <div>
        <Route path="/home" component={Home} />
        <Route path="/jiraAssignTimeline" component={JiraAssignHistoryTimeline} />
      </div>
    </Router>
  );
};
