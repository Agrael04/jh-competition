import { makeStyles, Theme } from '@material-ui/core/styles'

import lightGreen from '@material-ui/core/colors/lightGreen'
import amber from '@material-ui/core/colors/amber'

export default makeStyles((theme: Theme) => {
  return {
    avatar: {
      height: theme.spacing(6),
      width: theme.spacing(6),
      cursor: 'pointer',
      margin: 'auto',
    },
  }
})
