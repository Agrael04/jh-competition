import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import App from './app'

import useStyles from '../hooks/use-styles'
import css from './styles'

export default function Routes() {
  const classes = useStyles(css)

  return (
    <div className={classes.app}>
      <AppBar position='fixed' className={classes.appBar}>
        <Container>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Jumping Hall Competitions
            </Typography>
            <Button color='inherit' className={classes.button}>
              Войти
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Switch>
        <Route path={'/app'} exact={true}>
          <App />
        </Route>
        <Route>
          <App />
        </Route>
      </Switch>
    </div>
  )
}
