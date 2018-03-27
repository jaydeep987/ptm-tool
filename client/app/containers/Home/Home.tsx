import * as React from 'react';

import FlatButton from 'material-ui/FlatButton';
import '../../modules/extended-modules';

export default class Home extends React.Component<any, any> {

  constructor(props, state) {
    super(props, state);
  }

  public render() {
    return(
      <div>
        <h3>PTM</h3>
        <pre>
          This is home of tool. More will be added soon. <br/>
          Following part will be moved to its own container.
        </pre>
      </div>
    );
  }
}
