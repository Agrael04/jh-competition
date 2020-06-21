export default interface IPayment {
  _id: string
  type: 'units' | 'money'
  pass?: {
    _id: string
  }
  createdAt: Date
  amount: number
  destination?: string
  transaction?: string
  __typename: string
}