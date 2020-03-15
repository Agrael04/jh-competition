import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  avatarBackground: {
    background: theme.palette.secondary.main,
  },
  timeTd: {
    width: theme.spacing(10),
  },
  trainersTh: {
    width: theme.spacing(20),
    position: 'relative',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    borderRight: `2px dotted ${theme.palette.secondary.main}`,
  },
  trainersTd: {
    width: theme.spacing(20),
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    borderRight: `2px dotted ${theme.palette.secondary.main}`,
  },
  trainersColumnShift: {
    width: theme.spacing(40),
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  resourceTd: {
    borderLeft: `2px dotted ${theme.palette.primary.main}`,
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
  trainerAvatar: {
    marginLeft: theme.spacing(-5),
    transition: theme.transitions.create(['margin-left'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  emptyTrainerAvatar: {
    marginLeft: theme.spacing(-8),
    transition: theme.transitions.create(['margin-left'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  firstEmptyTrainerAvatar: {
    marginLeft: theme.spacing(-3),
    transition: theme.transitions.create(['margin-left'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  openedTrainerAvatar: {
    marginLeft: theme.spacing(0),
  },
  toggleOpenedTrainers: {
    position: 'absolute',
    color: 'white',
    right: 0,
    bottom: 0,
    transform: 'translate(50%, 50%)',
    zIndex: 10,
  },
}))
