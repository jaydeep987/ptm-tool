import * as React from 'react';

import { AppBar, Paper } from 'material-ui';

class HomeLandingPage extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    const title: string = `I wanna show something overview or most useful things of tool here.
    So that at first sight, we can see what everyday we need.
    Like Dashboard ?`;
    return(
      <Paper>
        <AppBar iconStyleLeft={{display: 'none'}} title="Dashboard" />
        <Paper>
          {title}
        </Paper>
      </Paper>
    );
  }
}

export default HomeLandingPage;
