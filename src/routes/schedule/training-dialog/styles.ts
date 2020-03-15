import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => {
  return {
    box: {
      height: `calc(100% - ${theme.spacing(8)}px)`,
    },
    dialogBody: {
      height: '100%',
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }
})
