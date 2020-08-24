import React from 'react'
import { Switch, Route } from 'react-router-dom'

import useStyles from './styles'

import Schedule from './schedule'
import TrainingPasses from './training-passes'
import Records from './records'
import Clients from './clients'

import Login from './login'

import PrivateRoute from '../components/private-route'

export default function Routes() {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <Switch>
        <PrivateRoute path={'/schedule'} exact={true}>
          <Schedule />
        </PrivateRoute>

        <PrivateRoute path={'/training-passes'} exact={true}>
          <TrainingPasses />
        </PrivateRoute>

        <PrivateRoute path={'/records'} exact={true}>
          <Records />
        </PrivateRoute>

        <PrivateRoute path={'/clients'} exact={true}>
          <Clients />
        </PrivateRoute>

        <PrivateRoute path='/' exact={true}>
          <Schedule />
        </PrivateRoute>

        <Route path={'/login'} exact={true}>
          <Login />
        </Route>
      </Switch>
    </div>
  )
}
