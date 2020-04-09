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
  resource: string
}

export interface ITrainingForm {
  _id: string

  gym: {
    link: string
  }
  resource: {
    link: string
  }
  trainer: {
    link: string
  } | undefined

  date: Date
  startTime: number
  endTime: number

  name?: string
  type?: string
  note?: string
}
