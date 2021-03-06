import clsx from 'clsx'

import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'

import useStyles from './styles'

interface IProps {
  open: boolean
  handleDrawerOpen: () => void
}

function LayoutAppBar({ handleDrawerOpen, open }: IProps) {
  const classes = useStyles()

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Box marginLeft={2}>
          <Typography variant='h6'>
            Jumping hall
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default LayoutAppBar
