import { AnonymousCredential } from 'mongodb-stitch-browser-sdk'

import ITraining, { ITrainingRecord } from '../../../interfaces/training'
import { db, client } from '../index'

const TRAININGS_COLLECTION = 'trainings'
const TRAINING_RECORDS_COLLECTION = 'training-records'
const TRAINEES_COLLECTION = 'users'

const removeTimeFromDate = (date: Date | undefined) => {
  if (!date) {
    return null
  }

  return new Date(date.toDateString())
}

const createRecordsForTraining = async (_id: string, _records: ITrainingRecord[]) => {
  if (_records.length > 0) {
    const res = await db.collection(TRAINING_RECORDS_COLLECTION).insertMany(
      _records.map(r => ({
        trainee: r.trainee._id,
        seasonPass: r.seasonPass,
        status: r.status,
        note: r.note,
      }))
    )

    const records = Object.values(res.insertedIds)

    db.collection(TRAININGS_COLLECTION).updateOne(
      { _id },
      { records }
    )
  }
}

export const createTraining = async (tr: ITraining) => {
  const training = { ...tr }
  const date = removeTimeFromDate(training.date)

  if (training.trainer === undefined) {
    delete training.trainer
  }

  await client.auth.loginWithCredential(new AnonymousCredential())

  const trainingRes = await db.collection(TRAININGS_COLLECTION).insertOne({
    ...training,
    date,
    records: [],
  })

  await createRecordsForTraining(trainingRes.insertedId, training.records)

  return trainingRes.insertedId
}

export const readTrainings = async () => {
  await client.auth.loginWithCredential(new AnonymousCredential())

  const trainings = await db.collection(TRAININGS_COLLECTION).find().toArray()

  const recordIds = trainings
    .map((r: any) => r.records)
    .reduce((res, a) => [...res, ...a], [])

  const records = await db.collection(TRAINING_RECORDS_COLLECTION).find(
    {
      _id: { $in: recordIds },
    }
  ).toArray()

  const traineeIds = records.map((r: any) => r.trainee)

  const trainees = await db.collection(TRAINEES_COLLECTION).find(
    {
      _id: { $in: traineeIds },
    },
    {
      projection: { fullName: 1 },
    }
  ).toArray()

  const res = trainings.map((tr: any) => ({
    ...tr,
    records: tr.records.map(
      (id: any) => {
        const r: any = records.find((r: any) => r._id.toString() === id.toString())

        return {
          ...r,
          trainee: trainees.find((trainee: any) => trainee._id.toString() === r.trainee.toString()),
        }
      }
    ),
  }))

  return res
}

interface Training extends ITraining {
  _id: string
}

export const updateTraining = async (oldTr: Training, newTr: ITraining) => {
  const training = { ...newTr }
  const date = removeTimeFromDate(newTr.date)

  if (training.trainer === undefined) {
    delete training.trainer
  }

  await client.auth.loginWithCredential(new AnonymousCredential())

  await db.collection(TRAININGS_COLLECTION).updateOne(
    { _id: oldTr._id },
    {
      ...training,
      date,
      records: [],
    }
  )

  if (oldTr.records) {
    await db.collection(TRAINING_RECORDS_COLLECTION).deleteMany({ _id: { $in: oldTr.records } })
  }

  await createRecordsForTraining(oldTr._id, training.records)

  return oldTr._id
}

export const deleteTraining = async (tr: ITraining) => {
  const recordIds = tr.records.map(r => r._id)
  await client.auth.loginWithCredential(new AnonymousCredential())
  await db.collection(TRAINING_RECORDS_COLLECTION).deleteMany({ _id: { $in: recordIds } })
  await db.collection(TRAININGS_COLLECTION).deleteOne({ _id: tr._id })
}
