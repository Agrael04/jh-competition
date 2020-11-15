
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
}

export default interface IGetTrainingResourceResponse {
  trainingResource: {
    _id: string
    __typename: string
    startTime: number
    endTime: number
    resource: {
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
    training: {
      _id: string
      __typename: string
      type: string
      date: Date
    }
  } | null
  trainingRecords: ITrainingRecord[]
}