import { Moment } from 'moment'

export interface IPaymentForm {
  _id?: string
  contact: {
    link: string
  }
  gym: {
    link: string
  }
  date: Moment
  createdAt: Moment
  type: 'money' | 'units' | null
  pass?: {
    link: string
  }
  amount: number | null
  destination?: string
  transaction?: string
}
