import teal from '@material-ui/core/colors/teal'
import amber from '@material-ui/core/colors/amber'
// import lightGreen from '@material-ui/core/colors/lightGreen'

import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  typography: {
    button: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: teal,
    secondary: amber,
  },
})
