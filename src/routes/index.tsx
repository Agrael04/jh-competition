import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './app'

import useStyles from '../hooks/use-styles'
import css from './styles'

export default function Routes() {
  const classes = useStyles(css)

  return (
    <div className={classes.app}>
      <Switch>
        <Route path={'app'} exact={true}>
          <App />
        </Route>
        <Route>
          <App />
        </Route>
      </Switch>
    </div>
  )
}
