import { AnonymousCredential } from 'mongodb-stitch-browser-sdk'

import ITraining, { ITrainingId } from '../../../interfaces/training'
import { client } from '../index'

interface Training extends ITraining {
  _id: string
}

const removeTimeFromDate = (date: Date | undefined) => {
  if (!date) {
    return null
  }

  return new Date(date.toDateString())
}

export const createTraining = async (tr: ITraining) => {
  const date = removeTimeFromDate(tr.date)
  const training = { ...tr, date }

  await client.auth.loginWithCredential(new AnonymousCredential())
  const res = await client.callFunction('createTraining', [training])

  return res.insertedId
}

export const readTrainings = async () => {
  await client.auth.loginWithCredential(new AnonymousCredential())
  const res = await client.callFunction('readTrainings', [])

  return res
}

export const updateTraining = async (oldTr: Training, newTr: ITraining) => {
  const date = removeTimeFromDate(newTr.date)
  const training = { ...newTr, date }

  await client.auth.loginWithCredential(new AnonymousCredential())
  const res = await client.callFunction('updateTraining', [oldTr, training])

  return res
}

export const deleteTraining = async (tr: ITraining) => {
  await client.auth.loginWithCredential(new AnonymousCredential())
  await client.callFunction('deleteTraining', [tr])

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
