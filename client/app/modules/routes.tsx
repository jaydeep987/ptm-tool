import * as React from 'react';

import { Redirect, Route, Router } from 'react-router-dom';

import { Home, HomeLandingPage, JiraAssignHistoryTimeline } from '../containers';

export default (history) => {
  return (
    <Router history={history}>
      <div>
        <Redirect to="/homeLandingPage" />
        <Route path="/homeLandingPage" component={HomeLandingPage} />
        <Route path="/jiraAssignTimeline" component={JiraAssignHistoryTimeline} />
      </div>
    </Router>
  );
};
