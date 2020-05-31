export default interface ICheckRecord {
  _id: string
  priceType: 'units' | 'money'
  priceAmount: number
  attendant: {
    _id: string
    fullName: string
    __typename: string
  }
  training: {
    _id: string
    type: string
    name: string
    __typename: string
  }
  resource: {
    _id: string
    startTime: number
    endTime: number

    resource: {
      _id: string
      name: string
      __typename: string
    }

    trainer: {
      _id: string
      firstName: string
      lastName: string
      __typename: string
    }
    __typename: string
  }
  __typename: string
}