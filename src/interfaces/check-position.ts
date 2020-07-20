export interface ICheckPositionForm {
  _id?: string
  contact: {
    link: string
  }
  type: string
  service: number
  priceType: 'units' | 'money' | null
  priceAmount: number | null
  date: Date
}
