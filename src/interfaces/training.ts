import ITrainer from './trainer'

export interface ITrainingRecord {
  _id?: string
  trainee: {
    _id: string
    fullName: string
  }
  seasonPass?: string
  status?: string
  note?: string
  training?: string
}

export interface ITrainingId {
  /* gym */
  /* date */
  time: string
  resource: number
}

export default interface ITraining {
  _id: string

  gym: number | undefined
  date: Date
  startTime: number | null
  endTime: number | null
  resource: number | undefined

  trainer?: string | ITrainer | undefined
  name?: string
  type?: string
  markPrice?: number | null
  moneyPrice?: number | null
  note?: string
}
