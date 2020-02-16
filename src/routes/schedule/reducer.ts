interface IRecord {
  time: string
  resource: number
  trainer: number
}

interface ICell {
  resource: number
  time: string
}

const initState: { schedule: IRecord[] } = {
  schedule: [],
}

const CREATE_RECORD = 'schedule/CREATE_RECORD'
const MOVE_RECORD = 'schedule/MOVE_RECORD'

export const createRecord = (source: ICell, target: ICell, trainer: number) => ({
  type: CREATE_RECORD,
  payload: { source, target, trainer },
})

export const moveRecord = (source: ICell, target: ICell, trainer: number) => ({
  type: MOVE_RECORD,
  payload: { source, target, trainer },
})

export default (state = initState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case CREATE_RECORD: {
      const { target, trainer } = payload
      return {
        schedule: [
          ...state.schedule,
          {
            time: target.time,
            resource: target.resource,
            trainer,
          },
        ],
      }
    }

    case MOVE_RECORD: {
      const { target, source } = payload
      const targetIndex = state.schedule.findIndex(record => record.time === target.time && record.resource === target.resource)
      const sourceIndex = state.schedule.findIndex(record => record.time === source.time && record.resource === source.resource)

      if (targetIndex === -1) {
        return {
          schedule: [
            ...state.schedule.filter((i, index) => index !== sourceIndex),
            { time: target.time, resource: target.resource, trainer: state.schedule[sourceIndex].trainer },
          ],
        }
      } else {
        return {
          schedule: [
            ...state.schedule.filter((i, index) => index !== sourceIndex && index !== targetIndex),
            { time: target.time, resource: target.resource, trainer: state.schedule[sourceIndex].trainer },
            { time: source.time, resource: source.resource, trainer: state.schedule[targetIndex].trainer },
          ],
        }
      }
    }

    default:
      return state
  }
}
