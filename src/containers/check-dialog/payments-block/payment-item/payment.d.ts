export default interface IPayment {
  _id: string
  type: 'units' | 'money'
  pass?: {
    _id: string
  }
  createdAt: Date
  amount: number
  isDebt: boolean
  destination?: string
  transaction?: string
  __typename: string
}