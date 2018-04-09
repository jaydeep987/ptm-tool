import * as React from 'react';

import { AppBar, Paper, RaisedButton, TextField } from 'material-ui';
import { connect, Dispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import * as actions from '../../actions/JiraProjectIssues';
import '../../modules/extended-modules';
import { IJiraHistoryIssuesReducerState } from '../../reducers/jiraProjectIssues';
import { AssignHistoryTimeline, Loading } from './../../components';

export interface IHomeState {
  jiraProjectId: string;
}

export interface IHomeProps {
  isRequesting: boolean;
  issuesData: any;
  dispatch: Dispatch<any>;
}

const mainPaperStyle: any = {
  margin: '0 auto',
  display: 'block',
  padding: 5,
};

const jiraInputToolbarStyle: any = {
  margin: 5,
  padding: 5,
};

const assignHistoryTimelineStyle: any = {
  margin: 5,
};

class JiraAssignHistoryTimeline extends React.Component<IHomeProps, IHomeState> {

  constructor(props, state) {
    super(props, state);

    this.state = {
      jiraProjectId: 'JPICHB',
    };
    this.updateInputJiraId = this.updateInputJiraId.bind(this);
    this.loadGraph = this.loadGraph.bind(this);
  }

  public render() {
    const loadBtnStyle: object = {
        marginLeft: 10,
    };
    return(
      <Paper style={mainPaperStyle}>
        <AppBar title="JIRA Assignment History Timeline" iconStyleLeft={{display: 'none'}} />
        <Paper style={jiraInputToolbarStyle} zDepth={2}>
          <TextField hintText="JIRA Project ID" value={this.state.jiraProjectId} onChange={this.updateInputJiraId} />
          <RaisedButton label="Load" style={loadBtnStyle} onClick={this.loadGraph} />
        </Paper>
        <Paper style={assignHistoryTimelineStyle}>
          {this.props.isRequesting && <Loading />}
          {this.props.isRequesting === false && <AssignHistoryTimeline data={this.props.issuesData} />}
        </Paper>
      </Paper>
    );
  }

  private updateInputJiraId(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      jiraProjectId: event.currentTarget.value,
    });
  }

  private loadGraph() {
    const { dispatch } = this.props;
    dispatch(actions.fetchJiraProjectIssues(this.state.jiraProjectId));
  }
}

function mapStateToProps(state) {
  const jiraProjectIssues: IJiraHistoryIssuesReducerState = state.jiraProjectIssues;
  const {
    isRequesting,
    issuesData,
  } = jiraProjectIssues || {
    isRequesting: undefined,
    issuesData: undefined,
  };

  return {
    isRequesting,
    issuesData,
  };
}

export default connect(mapStateToProps)(JiraAssignHistoryTimeline);
