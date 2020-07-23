export default interface ICheckRecord {
  _id: string
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
    __typename: string
  }
  __typename: string
}