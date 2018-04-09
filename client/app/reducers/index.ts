import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';

import jiraProjectIssues from './jiraProjectIssues';
import sidebar from './sidebar';

const reducers: Reducer<any> = combineReducers({
  routerReducer,
  jiraProjectIssues,
  sidebar,
});

export default reducers;
