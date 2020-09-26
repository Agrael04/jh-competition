export interface ICheckPositionForm {
  _id?: string
  contact: {
    link: string
  }
  gym: {
    link: string
  }
  type: string
  service: string
  priceType: 'units' | 'money' | null
  priceAmount: number | null
  date: Date
}
