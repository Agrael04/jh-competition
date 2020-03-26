import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  resourceTd: {
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    position: 'relative',
    height: theme.spacing(4.5),
  },
  mainAvatar: {
    zIndex: 10,
    border: '2px solid',
  },
  secondaryAvatar: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: theme.spacing(-1),
    border: '2px solid',
    fontSize: '0.75rem',
  },
  cellWrap: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
  },
  button: {
    height: '100%',
  },
}))
