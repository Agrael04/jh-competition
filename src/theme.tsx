import amber from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'

import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  typography: {
    button: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      'light': green[100],
      'main': green[500],
      'dark': green[700],
      'contrastText': '#fff',
    },
    secondary: {
      'light': amber[100],
      'main': amber[500],
      'dark': amber[700],
      'contrastText': '#fff',
    },
  },
})
