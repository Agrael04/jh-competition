import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  rootPaper: {
    maxHeight: `calc(100vh - ${theme.spacing(14)}px)`,
    height: `calc(100vh - ${theme.spacing(14)}px)`,
    overflow: 'auto',
  },
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 'bold',
  },
  cell: {
    paddingBottom: 0,
    paddingTop: 0
  }
}))
