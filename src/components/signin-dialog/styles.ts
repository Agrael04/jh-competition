import { Theme } from '@material-ui/core/styles'

import teal from '@material-ui/core/colors/teal'

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
  },
  media: {
    height: theme.spacing(8),
    background: teal[400],
    color: 'white',
  },
})
