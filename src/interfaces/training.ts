export interface ITrainingRecord {
  _id?: string
  trainee: {
    _id: string
    fullName: string
  }
  seasonPass?: string
  status?: string
  note?: string
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
  time: string
  resource: number | undefined

  trainer?: number | undefined
  name?: string
  type?: string
  markPrice?: number | null
  moneyPrice?: number | null
  note?: string

  records: ITrainingRecord[]
}
