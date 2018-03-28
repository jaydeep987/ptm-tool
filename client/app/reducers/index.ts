import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';

import jirahistory from './jirahistory';

const reducers: Reducer<{}> = combineReducers({
  ...routerReducer,
  jirahistory,
});

export default reducers;
