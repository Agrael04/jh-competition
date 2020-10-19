import { Moment } from 'moment'

export default interface ITrainingForm {
  gym: { link: string }
  date: Moment

  name?: string
  type?: string
  traineesAmount?: number
  note?: string
}