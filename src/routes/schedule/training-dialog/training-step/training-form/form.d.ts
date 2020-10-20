import { Moment } from 'moment'

export default interface ITrainingForm {
  gym: { link: string }
  date: Moment

  type: string
  traineesAmount: number

  name?: string
  note?: string
}