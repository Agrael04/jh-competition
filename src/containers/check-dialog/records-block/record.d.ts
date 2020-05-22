export default interface ICheckRecord {
  _id: string
  contact: {
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
  __typename: string
}