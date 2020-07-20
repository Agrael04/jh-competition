export default interface IRecord {
  _id: string
  priceType: 'units' | 'money' | undefined
  priceAmount: number
  __typename
}