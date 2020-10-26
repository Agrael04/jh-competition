import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  primaryRow: {
    borderBottom: `2px solid ${theme.palette.primary.light}`,
  },
  secondaryRow: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  activeRow: {
    borderBottom: `2px solid ${theme.palette.error.main}`,
  },
  primaryCol: {
    borderLeft: `2px solid ${theme.palette.primary.light}`,
  },
  secondaryCol: {
    borderLeft: `2px solid ${theme.palette.secondary.main}`,
  },
}))
