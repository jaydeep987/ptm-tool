import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';

import jiraProjectIssues from './jiraProjectIssues';
import sidebarToggle from './sidebarToggle';

const reducers: Reducer<any> = combineReducers({
  routerReducer,
  jiraProjectIssues,
  sidebarToggle,
});

export default reducers;
