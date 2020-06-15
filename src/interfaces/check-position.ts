export interface ICheckPositionForm {
  _id?: string
  contact: {
    link: string
  }
  type: string
  service: number
  priceType: 'units' | 'money'
  priceAmount: number
  date: Date
}
