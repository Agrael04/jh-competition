import { Moment } from 'moment'

export interface IClientForm {
  firstName?: string
  lastName?: string
  birthday?: Moment | null
  phone?: string
  altPhone?: string
  communicationType: string[]
  questionaryNumber?: string
  source?: string
  rights?: Array<'ATTEND' | 'RECORD'>
  group?: string
  groupRole?: string
  level?: string
  specialConditions?: string
}

export default IClientForm