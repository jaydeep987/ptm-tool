import * as React from 'react';

import FlatButton from 'material-ui/FlatButton';

export default class Home extends React.Component<any, any> {

  constructor(props, state) {
    super(props, state);
  }

  public handleClick() {
    alert('1');
  }

  public render() {
    return(
      <div>
        This is Home!
        <FlatButton label="Click" onTouchTap={this.handleClick} />
      </div>
    );
  }
}
