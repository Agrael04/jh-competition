import { AnonymousCredential, BSON } from 'mongodb-stitch-browser-sdk'

import ITraining, { ITrainingId, ITrainingRecord } from 'interfaces/training'
import { client } from '../index'
import PartialBy from 'interfaces/partial-by'

import removeTimeFromDate from 'utils/remove-time-from-date'

export const createTraining = async (tr: PartialBy<ITraining, '_id'>) => {
  const date = removeTimeFromDate(tr.date)
  const training = { ...tr, date }

  await client.auth.loginWithCredential(new AnonymousCredential())
  const res = await client.callFunction('createTraining', [training])

  return res
}

export const readTrainings = async (date: Date) => {
  await client.auth.loginWithCredential(new AnonymousCredential())
  const res = await client.callFunction('readTrainings', [removeTimeFromDate(date)])

  return res
}

export const updateTraining = async (oldTr: ITraining, newTr: PartialBy<ITraining, '_id'>) => {
  const date = removeTimeFromDate(newTr.date)
  const training = {
    ...newTr,
    date,
    _id: new BSON.ObjectID(newTr._id),
    records: newTr.records.map(r => ({
      ...r,
      trainee: new BSON.ObjectID(r.trainee._id),
    })),
  }

  const records = oldTr.records.map(r => new BSON.ObjectID(r._id))

  await client.auth.loginWithCredential(new AnonymousCredential())
  const res = await client.callFunction('updateTraining', [training, records])

  return res
}

export const deleteTraining = async (id: string, rawRecords: ITrainingRecord[]) => {
  const _id = new BSON.ObjectID(id)
  const records = rawRecords.map(r => new BSON.ObjectID(r._id))

  await client.auth.loginWithCredential(new AnonymousCredential())
  await client.callFunction('deleteTraining', [_id, records])

  return
}

export const moveTraining = async (from: ITrainingId, to: ITrainingId) => {
  await client.auth.loginWithCredential(new AnonymousCredential())
  await client.callFunction('moveTraining', [from, to])

  return
}

export default {
  createTraining,
  readTrainings,
  updateTraining,
  deleteTraining,
  moveTraining,
}
