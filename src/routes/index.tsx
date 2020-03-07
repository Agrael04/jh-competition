import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import Schedule from './schedule'

import Layout from '../components/layout'
import theme from '../theme'

export default function Routes() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Switch>
          <Route path={'/schedule'} exact={true}>
            <Schedule />
          </Route>
          <Route>
            <Schedule />
          </Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  )
}
