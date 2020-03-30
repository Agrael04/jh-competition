import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  avatar: {
    margin: 'auto',
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  divider: {
    height: '2px',
    background: theme.palette.primary.main,
  },
}))
