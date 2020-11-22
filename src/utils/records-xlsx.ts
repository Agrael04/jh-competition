import XLSX from 'xlsx'
import moment from 'moment'
import uniq from 'lodash/uniq'

import { getTimeLabel } from 'data/times'
import { trainingTypes } from 'data/training-types'

const PEOPLE_TYPE = 'PEOPLE'
const HOURS_TYPE = 'HOURS'

interface IRecord {
  _id: string
  training: {
    _id: string
    date: string
    gym: {
      _id: string
      shortName: string
    }
    type: string
  }
  resource: {
    startTime: number
    endTime: number
    trainer: {
      _id: string
      firstName: string
      lastName: string
    }
  }
  contact: {
    _id: string
    firstName: string
    lastName: string
  }
}

type IContact = IRecord['contact']

export interface ITraining {
  _id: IRecord['training']['_id']
  trainer: IRecord['resource']['trainer']
  startTime: IRecord['resource']['startTime']
  endTime: IRecord['resource']['endTime']
  gym: IRecord['training']['gym'],
  date: IRecord['training']['date'],
  type: IRecord['training']['type']
  hours: number
  people: number
  valueType: typeof PEOPLE_TYPE | typeof HOURS_TYPE
  contacts: IContact[]
}

const generateXLSX = (records: any[][], trainers: any[][], dates: any[][]) => {
  const wb = XLSX.utils.book_new()
  const recordsSheet = XLSX.utils.aoa_to_sheet(records)
  const trainersSheet = XLSX.utils.aoa_to_sheet(trainers)
  const datesSheet = XLSX.utils.aoa_to_sheet(dates)

  XLSX.utils.book_append_sheet(wb, recordsSheet, 'Записи до конца месяца')
  XLSX.utils.book_append_sheet(wb, datesSheet, 'По дням')
  XLSX.utils.book_append_sheet(wb, trainersSheet, 'Тренера')
  XLSX.writeFile(wb, 'Записи.xlsx')
}

const prepareData = (trainings: ITraining[]) => {
  const trainers = uniq(trainings.map(tr => `${tr.trainer?.lastName} ${tr.trainer?.firstName}`))
    .map(trainer => {
      const trs = trainings.filter(tr => `${tr.trainer?.lastName} ${tr.trainer?.firstName}` === trainer)

      return ({
        name: trainer,
        activeHours: trs
          .filter(tr => moment(tr.date).diff(moment()) <= 0)
          .reduce((res, tr) => {
            return res + (tr.valueType === HOURS_TYPE ? tr.hours : 0)
          }, 0),
        hours: trs
          .reduce((res, tr) => {
            return res + (tr.valueType === HOURS_TYPE ? tr.hours : 0)
          }, 0),
        activePeople: trs
          .filter(tr => moment(tr.date).diff(moment()) <= 0)
          .reduce((res, tr) => {
            return res + (tr.valueType === PEOPLE_TYPE ? tr.people : 0)
          }, 0),
        people: trs
          .reduce((res, tr) => {
            return res + (tr.valueType === PEOPLE_TYPE ? tr.people : 0)
          }, 0),
        days: uniq(trs.map(tr => tr.date)).length,
      })
    })

  const dates = uniq(trainings.map(tr => tr.date)).map(date => ({
    date: moment(date).format('DD.MM.YYYY'),
    hours: trainings.filter(tr => tr.date === date).reduce((res, tr) => res + tr.hours, 0),
    people: trainings.filter(tr => tr.date === date).reduce((res, tr) => res + tr.people, 0),
  }))

  const recordsSheet = [
    ['Дата', 'Зал', 'Тип тренировки', 'Время начало', 'Время конца', 'Тренер', 'Батуто-часы', 'Люди', 'Контакты'],
    ...trainings.map(tr => ([
      moment(tr.date).format('DD.MM.YYYY'),
      tr.gym.shortName,
      trainingTypes.find(t => t.id === tr.type)?.text,
      getTimeLabel(tr.startTime),
      getTimeLabel(tr.endTime),
      `${tr.trainer?.lastName} ${tr.trainer?.firstName}`,
      tr.valueType === HOURS_TYPE ? tr.hours : '',
      tr.valueType === PEOPLE_TYPE ? tr.people : '',
      tr.contacts.map(contact => `${contact.lastName} ${contact.firstName}`).join(', '),
    ])),
  ]

  const trainersSheet = [
    ['', 'Б-ч', 'Люди', 'Дни'],
    ...trainers.map(tr => ([
      tr.name,
      `${tr.activeHours}(${tr.hours})`,
      `${tr.activePeople}(${tr.people})`,
      tr.days,
    ])),
  ]

  const datesSheet = [
    ['Дата', 'Б-ч', 'Люди'],
    ...dates.map(date => ([
      date.date,
      date.hours,
      date.people,
    ])),
    [],
    ['', dates.reduce((res, date) => res + date.hours, 0), dates.reduce((res, date) => res + date.people, 0)],
  ]

  return {
    recordsSheet,
    trainersSheet,
    datesSheet,
  }
}

export default function createXLSX (trainings: ITraining[]) {
  const { recordsSheet, trainersSheet, datesSheet } = prepareData(trainings)

  generateXLSX(recordsSheet, trainersSheet, datesSheet)
}
