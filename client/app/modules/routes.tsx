import * as React from 'react';

import { Route } from 'react-router-dom';

import { Home, HomeLandingPage, JiraAssignHistoryTimeline } from '../containers';

export default () => {
  return (
    <div>
      <Route path="/homeLandingPage" component={HomeLandingPage} />
      <Route path="/jiraAssignTimeline" component={JiraAssignHistoryTimeline} />
    </div>
  );
};
