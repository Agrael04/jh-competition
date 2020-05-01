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

  date: Date
  gym: {
    link: string
  }

  name?: string
  type?: string
  traineesCount?: number
  note?: string
}

export interface ITraining {
  _id: string

  gym: {
    link: string
  }
  date: Date
  startTime: number
  endTime: number

  name?: string
  type?: string
  count?: number
  note?: string
}

export interface ITrainingResourceForm {
  _id?: string
  resource: {
    link: string
  }
  trainer: {
    link: string
  }
  startTime: number
  endTime: number
  training: {
    link: string
  }
}

export interface ITrainingRecordForm {
  _id?: string
  contact: {
    link: string
    fullName: string
  }
  attendant?: {
    link: string
    fullName: string
  }
  status?: string
  resource: {
    link: string
  }
  training: {
    link: string
  }
}
