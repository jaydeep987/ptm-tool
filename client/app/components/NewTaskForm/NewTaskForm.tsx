import * as React from 'react';

import { AppBar, Divider, Paper, RaisedButton, TextField } from 'material-ui';
import { Field, reduxForm } from 'redux-form';

const styles = {
  registerBtnStyle: {
    margin: 10,
  },
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom,
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

enum TaskFormFields {
  TaskName = 'taskName',
  Description = 'description',
  JiraBu = 'jiraBu',
  JiraDu = 'jiraDu',
  ProjectSpecUrl = 'projectSpecUrl',
  GitPrUrl = 'gitPrUrl',
  JsSpecUrl = 'jsSpecUrl',
  ApiSpecUrl = 'apiSpecUrl',
  TestCaseUrl = 'testCaseUrl',
  AkamiJira = 'akamaiJira',
  GitTagName = 'gitTagName',
  OtherLinks = 'otherLinks',
}

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    TaskFormFields.TaskName,
    TaskFormFields.JiraDu,
  ];

  console.log(values);
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const NewTaskForm = () => (
  <Paper>
    <form>
      <div>
        <Field name={TaskFormFields.TaskName} component={renderTextField} label="Project/Task Name" />
      </div>
      <div>
        <Field name={TaskFormFields.Description} component={renderTextField} label="Description" multiLine={true} rows={3} rowsMax={5} />
      </div>
      <div>
        <Field name={TaskFormFields.JiraBu} component={renderTextField} label="JIRA BU" />
      </div>
      <div>
        <Field name={TaskFormFields.JiraDu} component={renderTextField} label="JIRA DU" />
      </div>
      <div>
        <Field name={TaskFormFields.ProjectSpecUrl} component={renderTextField} label="Project Spec URL" />
      </div>
      <div>
        <Field name={TaskFormFields.GitPrUrl} component={renderTextField} label="Git PR URL" />
      </div>
      <div>
        <Field name={TaskFormFields.JsSpecUrl} component={renderTextField} label="JS Spec URL" />
      </div>
      <div>
        <Field name={TaskFormFields.ApiSpecUrl} component={renderTextField} label="API Spec URL" />
      </div>
      <div>
        <Field name={TaskFormFields.TestCaseUrl} component={renderTextField} label="Test cases URL" />
      </div>
      <div>
        <Field name={TaskFormFields.AkamiJira} component={renderTextField} label="AKAMAI JIRA" />
      </div>
      <div>
        <Field name={TaskFormFields.GitTagName} component={renderTextField} label="Git Tag Name" />
      </div>
      <div>
        <Field name={TaskFormFields.OtherLinks} component={renderTextField} label="Other links" multiLine={true} rows={3} rowsMax={5} />
      </div>
      <Divider />
      <div>
        <RaisedButton primary={true} label="Register Task" style={styles.registerBtnStyle} />
      </div>
    </form>
  </Paper>
);

export default reduxForm({
  form: 'NewTaskForm',
  validate,
})(NewTaskForm);
