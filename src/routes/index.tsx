import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './app'

import Layout from '../components/layout'

export default function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path={'/app'} exact={true}>
          <App />
        </Route>
        <Route>
          <App />
        </Route>
      </Switch>
    </Layout>
  )
}
