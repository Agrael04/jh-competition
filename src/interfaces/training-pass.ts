export interface ITrainingPassForm {
  _id?: string
  contact: {
    link: string
  } | null
  type: 'universal' | 'no_trainer' | 'sport' | 'open' | null
  size: string | null
  capacity: number | null
  duration: number | null
  activation: number | null
  price: number | null
  isActive: boolean | null
  createdAt: Date | null
}
