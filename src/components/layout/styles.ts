import { makeStyles, Theme } from '@material-ui/core/styles'

const drawerWidth = 240

export default makeStyles((theme: Theme) => ({
  app: {
    textAlign: 'center',
    minHeight: '100vh',
    width: '100%',
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    justifyContent: 'space-between',
  },
  link: {

  },
}))
