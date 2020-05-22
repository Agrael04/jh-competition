export default interface ICheckPass {
  _id: string
  type: 'universal' | 'no_trainer' | 'child_sport' | 'adult_sport' | 'open'
  size: string
  capacity: number
  expiresIn: Date
  __typename: string
}