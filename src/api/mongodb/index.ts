import { Stitch, RemoteMongoClient, AnonymousCredential, GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk'

import { ISearchedTrainee } from '../../interfaces/trainee'

const APP_ID = 'mongodb-provider-gzjek'
const DATABASE = 'test-db'
const COLLECTION = 'users'

export const client = Stitch.initializeDefaultAppClient(APP_ID)

export const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(DATABASE)

// await db.collection(COLLECTION).updateOne({ owner_id: user.id }, { $set: { number: 42 } }, { upsert: true })

const searchUsers = async (name: string) => {
  await client.auth.loginWithCredential(new AnonymousCredential())

  const docs = await db.collection(COLLECTION).find({ fullName: { $regex: name, $options: 'i' }, surname: { $ne: '' } }, { limit: 20, sort: { surname: 1 }, projection: { fullName: 1 } }).toArray()

  return docs as ISearchedTrainee[]
}

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
  const user = getCurrentUser()
  return user && client.auth.logoutUserWithId(user.id)
}

export default searchUsers
