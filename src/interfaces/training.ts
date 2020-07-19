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
  traineesAmount?: number
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
  resource?: {
    link: string
  }
  trainer?: {
    link: string
  } | null
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
  }
  attendant?: {
    link: string
  }
  status?: string
  resource: {
    link: string
  }
  training: {
    link: string
  }
  priceType: 'units' | 'money' | null
  priceAmount: number | null
}
