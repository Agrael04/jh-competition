export default interface ICheckPosition {
  _id: string
  priceType: 'units' | 'money'
  priceAmount: number
  __typename: string
}