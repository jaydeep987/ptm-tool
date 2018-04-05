import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';

import jiraProjectIssues from './jiraProjectIssues';

const reducers: Reducer<any> = combineReducers({
  routerReducer,
  jiraProjectIssues,
});

export default reducers;
