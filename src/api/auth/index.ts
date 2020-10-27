import * as Realm from 'realm-web'
import RealmApp from '../realm'

export async function loginWithPassword(username: string, password: string) {
  const credential = Realm.Credentials.emailPassword(username, password)

  const user = await RealmApp.logIn(credential)

  return user
}

export function isLoggedIn() {
  return !!RealmApp.currentUser
}

export function getAccessToken() {
  return RealmApp.currentUser?.accessToken
}

export function logout() {
  if (!RealmApp.currentUser) {
    return new Promise(() => ({}))
  }

  return RealmApp.currentUser.logOut()
}
