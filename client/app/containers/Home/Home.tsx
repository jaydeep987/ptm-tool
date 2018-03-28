import * as React from 'react';

import { GanttChart } from '@hh.ru/react-d3-chart-graphs';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import '../../modules/extended-modules';
import { AssisgnHistoryGraph } from './../../components';

class Home extends React.Component<any, any> {

  constructor(props, state) {
    super(props, state);

    this.loadGraph = this.loadGraph.bind(this);
  }
  public render() {
    const loadBtnStyle: object = {
        marginLeft: 10,
    };
    return(
      <div>
          <input className="project-name" value={this.props.projectName} />
          <RaisedButton label="Load" style={loadBtnStyle} onClick={this.loadGraph} />

          {this.props.isRequesting && <h3> Loading ... </h3>}
      </div>
    );
  }

  private loadGraph() {
    const { dispatch } = this.props;
    dispatch(actions.fetchJiraHistory('J'));
  }
}

function mapStateToProps(state) {
  const { isRequesting, history } = state;

  return {
    isRequesting,
    history,
  };
}

export default connect(mapStateToProps)(Home);
