import createHistory from 'history/createBrowserHistory';

import { History } from 'history';

/* https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but */
const getHistory: History = createHistory();

export default getHistory;
