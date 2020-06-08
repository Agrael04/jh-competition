import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { hasLoggedInUser, getCurrentUser, logoutCurrentUser } from 'api/mongodb'

import Layout from '../layout'

const GRAPHQL_URL = `https://stitch.mongodb.com/api/client/v2.0/app/${process.env.REACT_APP_MONGODB_APP_ID}/graphql`

export default function PrivateRoute({ path, exact, children }: any) {
  const [loggedIn, setLoggedIn] = React.useState(hasLoggedInUser())

  if (!loggedIn) {
    return (
      <Redirect to='/login' />
    )
  }

  const accessToken = getCurrentUser().auth.activeUserAuthInfo.accessToken

  const authLink = setContext((_: any, { headers }: any) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  }))

  const httpLink = new HttpLink({ uri: GRAPHQL_URL })

  const errorLink = onError(({ networkError }) => {
    if ((networkError as any)?.statusCode === 401) {
      logoutCurrentUser().then(
        () => setLoggedIn(hasLoggedInUser())
      )
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(errorLink.concat(httpLink)),
    cache: new InMemoryCache(),
  })

  return (
    <Route path={path} exact={exact}>
      <ApolloProvider client={client}>
        <Layout>
          {children}
        </Layout>
      </ApolloProvider>
    </Route>
  )
}
