export interface ITrainingPassForm {
  _id?: string
  contact: {
    link: string
  }
  type: 'universal' | 'no_trainer' | 'child_sport' | 'adult_sport' | 'open' | null
  size: string | null
  capacity: number | null
  duration: number | null
  activation: number | null
  createdAt: Date
}
