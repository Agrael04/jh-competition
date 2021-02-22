
interface ITrainingRecord {
  _id: string
  __typename: string
  contact: {
    _id: string
    __typename: string
    firstName: string
    lastName: string
  }
  status: string
  note: string
  attendant: {
    _id: string
    __typename: string
    firstName: string
    lastName: string
  }
}

export default interface IGetTrainingResourceResponse {
  newTraining: {
    _id: string
    __typename: string
    type: string
    note: string
    name: string
    date: Date
    startTime: number
    endTime: number
    resource: {
      _id: string
      __typename: string
    }
    gym: {
      _id: string
      __typename: string
    }
    trainer: {
      _id: string
      __typename: string
      color: number
      avatarSrc: string
      firstName: string
      lastName: string
    }
    // training: {
    //   _id: string
    //   __typename: string
    //   type: string
    //   date: Date
    // }
  } | null
  trainingRecords?: ITrainingRecord[]
}