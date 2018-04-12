import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './Main';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const render = !!module.hot && ReactDOM.render || ReactDOM.hydrate;

render(<Main />, document.getElementById('ptm-main'));
