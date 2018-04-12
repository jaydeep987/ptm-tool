import { deepOrange100 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeOptions: __MaterialUI.Styles.MuiTheme = {
  palette: {
    accent1Color: deepOrange100,
  },
};

/**
 * This is default customized MuITheme.
 * Use it with MuiThemeProvider to apply theme with some default values.
 */
const muiDefaultTheme: object = getMuiTheme({
  ...themeOptions,
});

export default muiDefaultTheme;

export {
  themeOptions,
};
