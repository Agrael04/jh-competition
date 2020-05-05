import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost'
import { setContext } from 'apollo-link-context'

import {
  hasLoggedInUser,
  loginAnonymous,
  getCurrentUser,
} from 'api/mongodb'

import Schedule from './schedule'

import Layout from '../components/layout'

const createClient = () => {
  if (!hasLoggedInUser()) {
    return null
  }

  const accessToken = getCurrentUser().auth.activeUserAuthInfo.accessToken

  // Add an Authorization header to each GraphQL request
  const authLink = setContext((_: any, { headers }: any) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  }))

  // Connect Apollo to the GraphQL Endpoint
  const GRAPHQL_URL = `https://stitch.mongodb.com/api/client/v2.0/app/mongodb-provider-gzjek/graphql`
  const httpLink = new HttpLink({ uri: GRAPHQL_URL })

  // Instantiate the Apollo Client
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return client
}

export default function Routes() {
  const [loggedIn, setLoggedIn] = React.useState(hasLoggedInUser())

  if (!loggedIn) {
    loginAnonymous().then(() => setLoggedIn(hasLoggedInUser))

    return null
  }

  const client = createClient()!

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}
