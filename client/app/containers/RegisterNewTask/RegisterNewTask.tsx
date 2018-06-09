import * as React from 'react';

import { AppBar, Paper } from 'material-ui';

import NewTaskForm from '../../components/NewTaskForm/NewTaskForm';

export default class RegisterNewTask extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper>
        <AppBar iconStyleLeft={{display: 'none'}} title="New Task" />
        <NewTaskForm />
      </Paper>
    );
  }
}
