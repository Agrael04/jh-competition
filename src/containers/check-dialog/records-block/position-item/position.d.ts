export default interface ICheckPosition {
  _id: string
  priceType: 'units' | 'money'
  priceAmount: number
  type: string
  service: string
  __typename: string
}