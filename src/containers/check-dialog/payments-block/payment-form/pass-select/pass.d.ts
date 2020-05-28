export default interface ICheckPass {
  _id: string
  type: 'universal' | 'no_trainer' | 'child_sport' | 'adult_sport' | 'open'
  size: string
  capacity: number
  duration: number
  activation: number
  createdAt: Date
  __typename: string
}