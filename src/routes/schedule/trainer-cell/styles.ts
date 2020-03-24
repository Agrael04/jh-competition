import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  trainersTd: {
    width: theme.spacing(20),
    position: 'relative',
    willChange: 'width',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  trainersColumnShift: {
    width: theme.spacing(40),
    willChange: 'width',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  trainerAvatar: {
    marginLeft: theme.spacing(-5),
    willChange: 'margin-left',
    transition: theme.transitions.create(['margin-left'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  emptyTrainerAvatar: {
    width: theme.spacing(8),
    marginLeft: theme.spacing(-8),
    willChange: 'margin-left',
    transition: theme.transitions.create(['margin-left'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  firstEmptyTrainerAvatar: {
    width: theme.spacing(8),
    marginLeft: theme.spacing(-3),
    willChange: 'margin-left',
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
