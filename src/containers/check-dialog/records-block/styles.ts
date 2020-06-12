import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  avatar: {
    background: theme.palette.primary.main,
  },
  debtAvatar: {
    background: theme.palette.error.main,
  },
  list: {
    maxHeight: theme.spacing(40),
    overflowY: 'auto',
  },
}))
