import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import * as authApi from 'api/auth'

import Layout from '../layout'

const GRAPHQL_URL = `https://realm.mongodb.com/api/client/v2.0/app/${process.env.REACT_APP_MONGODB_APP_ID}/graphql`

export default function PrivateRoute({ path, exact, children }: any) {
  const [loggedIn, setLoggedIn] = React.useState(authApi.isLoggedIn())

  if (!loggedIn) {
    return (
      <Redirect to='/login' />
    )
  }

  const accessToken = authApi.getAccessToken()

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    return forward(operation)
  })

  const httpLink = new HttpLink({ uri: GRAPHQL_URL })

  const errorLink = onError(({ networkError }) => {
    if ((networkError as any)?.statusCode === 401) {
      authApi.logout().then(
        () => setLoggedIn(authApi.isLoggedIn())
      )
    }
  })

  const client = new ApolloClient({
    link: from([authMiddleware, errorLink, httpLink]),
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
