import { Stitch, RemoteMongoClient, AnonymousCredential, GoogleRedirectCredential, UserPasswordCredential } from 'mongodb-stitch-browser-sdk'

const APP_ID = process.env.REACT_APP_MONGODB_APP_ID
const DATABASE = 'test-db'

export const client = Stitch.initializeDefaultAppClient(APP_ID)

export const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(DATABASE)

export function loginAnonymous() {
  // Allow users to log in anonymously
  const credential = new AnonymousCredential()

  return client.auth
    .loginWithCredential(credential)
    .then(user => {
      return user
    })
    .catch(console.error)
}

export function loginWithGoogle() {
  // Allow users to log in anonymously
  const credential = new GoogleRedirectCredential()
  client.auth.loginWithRedirect(credential)

  return client.auth.handleRedirectResult()
    .then(user => {
      return user
    })
    .catch(console.error)
}

export function loginWithPassword(username: string, password: string) {
  // Allow users to log in anonymously
  const credential = new UserPasswordCredential(username, password)

  return client.auth
    .loginWithCredential(credential)
    .then(user => {
      return user
    })
}

export function hasLoggedInUser() {
  // Check if there is currently a logged in user
  return client.auth.isLoggedIn
}

export function getCurrentUser(): any {
  // Return the user object of the currently logged in user
  return client.auth.isLoggedIn ? client.auth.user : null
}

export function logoutCurrentUser() {
  // Logout the currently logged in user
  return client.auth.logout()
}
