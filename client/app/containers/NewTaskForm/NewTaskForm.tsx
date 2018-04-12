import * as React from 'react';

import { AppBar, Divider, Paper, RaisedButton, TextField } from 'material-ui';

const styles = {
  registerBtnStyle: {
    margin: 10,
  },
};

export default class NewTaskForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    return(
      <Paper>
        <AppBar iconStyleLeft={{display: 'none'}} title="New Task" />
        <form>
          <div>
            <TextField name="taskName" hintText="Project/Task Name" floatingLabelText="Project/Task Name" />
          </div>
          <div>
            <TextField name="description" hintText="Description" floatingLabelText="Description" multiLine={true} rows={3} rowsMax={5} />
          </div>
          <div>
            <TextField name="jiraBu" hintText="JIRA BU" floatingLabelText="JIRA BU" />
          </div>
          <div>
            <TextField name="jiraDu" hintText="JIRA DU" floatingLabelText="JIRA DU" />
          </div>
          <div>
            <TextField name="projSpecUrl" hintText="Project Spec URL" floatingLabelText="Project Spec URL" />
          </div>
          <div>
            <TextField name="gitPrUrl" hintText="Git PR URL" floatingLabelText="Git PR URL" />
          </div>
          <div>
            <TextField name="jsSpecUrl" hintText="JS Spec URL" floatingLabelText="JS Spec URL" />
          </div>
          <div>
            <TextField name="testCasesUrl" hintText="Test cases URL" floatingLabelText="Test cases URL" />
          </div>
          <Divider />
          <div>
            <RaisedButton primary={true} label="Register Task" style={styles.registerBtnStyle} />
          </div>
        </form>
      </Paper>
    );
  }
}
