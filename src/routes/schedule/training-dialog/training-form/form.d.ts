import { Moment } from 'moment'

export default interface ITrainingForm {
  resource: { link: string }
  gym?: { link: string }
  date?: Moment

  startTime: number
  endTime: number
  trainer?: { link: string }
  type?: string
  name?: string
  note?: string
}
