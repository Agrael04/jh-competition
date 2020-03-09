import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import {
  getCurrentUser,
  hasLoggedInUser,
  loginAnonymous,
} from './index'

const initGraphQLClient = () => {
  hasLoggedInUser()
  if (!hasLoggedInUser()) {
    loginAnonymous()
  }

  if (hasLoggedInUser()) {
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
}

const client = initGraphQLClient()

export default client
