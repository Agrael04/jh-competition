import constants from '../../constants/schedule'

import { schedule as initialSchedule } from '../../../routes/schedule/data'

interface IRecord {
  time: string
  resource: number
  trainer: number
  gym: number
  date: Date
}

export interface IState {
  schedule: IRecord[]
  openedRecordDialog: boolean
  recordDialogPayload: IRecord | null
  dialogMode: string | null
}

const initialState: IState = {
  schedule: initialSchedule,
  openedRecordDialog: false,
  recordDialogPayload: null,
  dialogMode: null,
}

export default (state = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case constants.CREATE_RECORD: {
      return {
        ...state,
        openedRecordDialog: false,
        recordDialogPayload: null,
        dialogMode: null,
        schedule: [
          ...state.schedule,
          payload.record as IRecord,
        ],
      }
    }

    case constants.MOVE_RECORD: {
      const { target, source } = payload
      const targetIndex = state.schedule.findIndex(record => record.time === target.time && record.resource === target.resource)
      const sourceIndex = state.schedule.findIndex(record => record.time === source.time && record.resource === source.resource)

      if (targetIndex === -1) {
        return {
          ...state,
          schedule: [
            ...state.schedule.filter((i, index) => index !== sourceIndex),
            { time: target.time, resource: target.resource, trainer: state.schedule[sourceIndex].trainer } as IRecord,
          ],
        }
      } else {
        return {
          ...state,
          schedule: [
            ...state.schedule.filter((i, index) => index !== sourceIndex && index !== targetIndex),
            { time: target.time, resource: target.resource, trainer: state.schedule[sourceIndex].trainer } as IRecord,
            { time: source.time, resource: source.resource, trainer: state.schedule[targetIndex].trainer } as IRecord,
          ],
        }
      }
    }

    case constants.OPEN_CREATE_RECORD_DIALOG: {
      return {
        ...state,
        dialogMode: 'create',
        openedRecordDialog: true,
        recordDialogPayload: payload,
      }
    }

    case constants.OPEN_UPDATE_RECORD_DIALOG: {
      return {
        ...state,
        dialogMode: 'update',
        openedRecordDialog: true,
        recordDialogPayload: payload,
      }
    }

    case constants.CLOSE_RECORD_DIALOG: {
      return {
        ...state,
        dialogMode: null,
        openedRecordDialog: false,
        recordDialogPayload: null,
      }
    }

    default:
      return state
  }
}
