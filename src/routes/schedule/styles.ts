import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  avatarBackground: {
    background: theme.palette.secondary.main,
  },
  timeTd: {
    width: theme.spacing(10),
    paddingLeft: theme.spacing(2),
    position: 'relative',
  },
  resourceTd: {
    borderLeft: `2px dashed ${theme.palette.primary.main}`,
  },
  avatarPlaceholder: {
    width: theme.spacing(0),
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
  toggleHiddenTime: {
    position: 'absolute',
    color: 'white',
    left: theme.spacing(-5),
    bottom: 0,
    transform: 'translate(50%, 50%)',
    zIndex: 10,
    height: theme.spacing(2),
    minHeight: theme.spacing(2),
    width: theme.spacing(6),
    minWidth: theme.spacing(3),
    borderRadius: theme.spacing(2),
    textTransform: 'unset',
  },
  toggleOpenedTime: {
    position: 'absolute',
    color: 'white',
    left: theme.spacing(-3),
    transform: 'translate(50%, -100%)',
    zIndex: 10,
    height: theme.spacing(3),
    minHeight: theme.spacing(3),
    width: theme.spacing(3),
    minWidth: theme.spacing(3),
    borderRadius: theme.spacing(2),
    textTransform: 'unset',
  },
}))
