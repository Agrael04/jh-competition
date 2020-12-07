import { Link } from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import TodayIcon from '@material-ui/icons/Today'
import DomainIcon from '@material-ui/icons/Domain'
import PeopleIcon from '@material-ui/icons/People'
import SchoolIcon from '@material-ui/icons/School'
import ShutterSpeedIcon from '@material-ui/icons/ShutterSpeed'
import BookmarksIcon from '@material-ui/icons/Bookmarks'

import useStyles from './styles'

interface IProps {
  open: boolean
  handleDrawerClose: () => void
}

function LayoutDrawer({ open, handleDrawerClose }: IProps) {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      anchor='left'
      open={open}
      onClose={handleDrawerClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        <Link to='/' className={classes.link} onClick={handleDrawerClose}>
          <ListItem button={true} onClick={handleDrawerClose}>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary='Расписание' />
          </ListItem>
        </Link>
        <Link to='/records' className={classes.link} onClick={handleDrawerClose}>
          <ListItem button={true} onClick={handleDrawerClose}>
            <ListItemIcon>
              <BookmarksIcon />
            </ListItemIcon>
            <ListItemText primary='Записи' />
          </ListItem>
        </Link>
        <Link to='/training-passes' className={classes.link} onClick={handleDrawerClose}>
          <ListItem button={true} onClick={handleDrawerClose}>
            <ListItemIcon>
              <ShutterSpeedIcon />
            </ListItemIcon>
            <ListItemText primary='Абонименты' />
          </ListItem>
        </Link>
        <Link to='/clients' className={classes.link} onClick={handleDrawerClose}>
          <ListItem button={true}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Клиенты' />
          </ListItem>
        </Link>
        <ListItem button={true} onClick={handleDrawerClose}>
          <ListItemIcon>
            <DomainIcon />
          </ListItemIcon>
          <ListItemText primary='Залы' />
        </ListItem>
        <ListItem button={true} onClick={handleDrawerClose}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary='Тренера' />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default LayoutDrawer
