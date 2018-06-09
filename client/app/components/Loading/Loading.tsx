import * as React from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';

const LoadingStyle: React.CSSProperties = {
  display: 'inline-block',
  position: 'relative',
};

export default class Loading extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RefreshIndicator status="loading" size={40} top={0} left={10} style={LoadingStyle} {...this.props} />
    );
  }
}
