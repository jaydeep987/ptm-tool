import * as React from 'react';

export interface IIconProps {
  name: string;
  style?: React.CSSProperties;
}

export default class Icon extends React.Component<IIconProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <i className="material-icons" style={this.props.style}>
        {this.props.name}
      </i>
    );
  }
}
