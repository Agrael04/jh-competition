export default interface IPositionForm {
  type: string
  service: string
  priceAmount: number | null
  priceType: 'money' | 'units' | null
}