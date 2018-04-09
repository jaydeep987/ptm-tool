import * as React from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';

export default class Loading extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <RefreshIndicator status="loading" size={40} top={0} left={10} {...this.props} />
    );
  }
}
