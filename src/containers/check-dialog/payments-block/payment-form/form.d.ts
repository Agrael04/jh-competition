import { Moment } from 'moment'

export default interface IPaymentForm {
  amount?: number | null
  type?: 'money' | 'units' | null
  pass?: {
    link: string
  }
  destination?: string
  transaction?: string
  createdAt?: Moment
  contact?: { link: string }
  gym?: { link: string }
}

interface IProps {
  defaultValues?: IPaymentForm | null
  submit: (form: IPaymentForm) => void
}
