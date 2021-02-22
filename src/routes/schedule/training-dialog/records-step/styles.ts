import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  divider: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    background: theme.palette.primary.main,
  },
  list: {
    maxHeight: theme.spacing(40),
    overflowY: 'auto',
  },
}))
