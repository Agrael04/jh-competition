import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import App from './app'

import Layout from '../components/layout'
import theme from '../theme'

export default function Routes() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}
