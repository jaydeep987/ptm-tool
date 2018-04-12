import * as React from 'react';
import { Route } from 'react-router-dom';

import { HomeLandingPage, JiraAssignHistoryTimeline, NewTaskForm } from '../containers';

const routesData = [
  {
    path: '/homeLandingPage',
    exact: true,
    component: HomeLandingPage,
  },
  {
    path: '/newTaskForm',
    component: NewTaskForm,
  },
  {
    path: '/jiraAssignTimeline',
    component: JiraAssignHistoryTimeline,
  },
];

/* tslint:disable:jsx-no-multiline-js jsx-alignment */
const routes = (
  <div>
    {routesData.map(({path, exact, component: Component, ...rest}) => (
      <Route key={path} path={path} exact={exact} component={Component} />
    ))}
    {/* homeLandingPage */}
  </div>
);

export default routes;
export {
  routesData,
};
