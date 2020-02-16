import { makeStyles, Theme } from '@material-ui/core/styles'

import lightGreen from '@material-ui/core/colors/lightGreen'
import amber from '@material-ui/core/colors/amber'

export default makeStyles((theme: Theme) => {
  return {
    box: {
      position: 'relative',
      userSelect: 'none',
    },
    overlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      borderRadius: 4,
    },
    greenOverlay: {
      background: lightGreen[500],
      opacity: 0.5,
    },
    amberOverlay: {
      background: amber[500],
      opacity: 0.5,
    },
    redOverlay: {
      background: theme.palette.error.main,
      opacity: 0.5,
    },
  }
})
