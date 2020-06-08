export default interface IPassRow {
  _id: string
  type: 'universal' | 'no_trainer' | 'sport' | 'open'
  size: string
  capacity: number
  duration: number
  activation: number
  createdAt: Date
  price: number
  contact: {
    _id: string
    fullName: string
  }
  __typename: string
}