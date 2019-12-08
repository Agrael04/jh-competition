import { Theme } from '@material-ui/core/styles'

import teal from '@material-ui/core/colors/teal'

import { createMuiTheme } from '@material-ui/core/styles'

export default (theme: Theme) => ({
  container: {
    width: theme.spacing(75),
    flexDirection: 'column',
  },
  title: {
    marginTop: theme.spacing(3),
  },
  card: {
    margin: theme.spacing(3),
    flexDirection: 'column',
  },
  media: {
    height: theme.spacing(8),
    display: 'flex',
    background: teal[400],
  },
  icon: {
    color: 'white',
    margin: 'auto',
  },
})

export const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: teal,
  },
})
