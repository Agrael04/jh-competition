export default interface IPayment {
  _id: string
  type: 'units' | 'money'
  amount: number
  __typename
}