export interface IContactPaymentForm {
  _id?: string
  type: 'money' | 'pass' | null
  pass?: {
    link: number
  }
  amount: number
  destination?: string
  transaction?: string
}
