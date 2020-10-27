import * as Realm from 'realm-web'

const APP_ID = process.env.REACT_APP_MONGODB_APP_ID

const RealmApp: Realm.App = new Realm.App({ id: APP_ID })

export default RealmApp
