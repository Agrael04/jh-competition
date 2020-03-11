import { AnonymousCredential } from 'mongodb-stitch-browser-sdk'

import { ITrainingId } from 'interfaces/training'
import { client } from '../index'

export const moveTraining = async (from: ITrainingId, to: ITrainingId) => {
  await client.auth.loginWithCredential(new AnonymousCredential())
  await client.callFunction('moveTraining', [from, to])

  return
}

export default {
  moveTraining,
}
