export interface IPaymentForm {
  _id?: string
  contact: {
    link: string
  }
  gym: {
    link: string
  }
  date: Date
  createdAt: Date
  type: 'money' | 'units' | null
  pass?: {
    link: string
  }
  amount: number | null
  destination?: string
  transaction?: string
}
