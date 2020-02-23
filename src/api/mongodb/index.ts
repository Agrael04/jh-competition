import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk'

import { ISearchedTrainee } from '../../interfaces/trainee'

const APP_ID = 'mongodb-provider-gzjek'
const DATABASE = 'test-db'
const COLLECTION = 'users'

const client = Stitch.initializeDefaultAppClient(APP_ID)

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(DATABASE)

// await db.collection(COLLECTION).updateOne({ owner_id: user.id }, { $set: { number: 42 } }, { upsert: true })

const searchUsers = async (name: string) => {
  await client.auth.loginWithCredential(new AnonymousCredential())

  const docs = await db.collection(COLLECTION).find({ fullName: { $regex: name }, surname: { $ne: '' } }, { limit: 20, sort: { surname: 1 }, projection: { fullName: 1 } }).toArray()

  return docs as ISearchedTrainee[]
}

export default searchUsers
