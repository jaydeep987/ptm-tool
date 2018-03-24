import { deepOrange100 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/**
 * This is default customized MuITheme.
 * Use it with MuiThemeProvider to apply theme with some default values.
 */
const muiDefaultTheme: object = getMuiTheme({
  palette: {
    accent1Color: deepOrange100,
  },
});

export default muiDefaultTheme;
