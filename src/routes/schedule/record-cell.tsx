import React from 'react'

import { trainerSchedule } from './data'

import { DND_CREATE_TRAINING, DND_MOVE_TRAINING } from './constants'

import DragableAvatar from './components/dragable-avatar'
import DropableCell from './components/dropable-cell'

import { createRecord, moveRecord } from './reducer'

const isTrainerAvailableAtTime = (trainer: number, time: string) => {
  const scheduleRow = trainerSchedule.find(record => record.time === time)
  const tr = scheduleRow && scheduleRow.trainers.find(tr => tr === trainer)

  return tr !== undefined
}

const RecordCell = ({ time, resource, mappedSchedule, dispatch }: any) => {
  const record = React.useMemo(
    () => mappedSchedule.find((record: any) => record.time === time && record.resource === resource),
    [mappedSchedule, time, resource]
  )

  const source = React.useMemo(
    () => ({ time, resource }),
    [time, resource]
  )

  const onDrop = React.useCallback((type: typeof DND_CREATE_TRAINING | typeof DND_MOVE_TRAINING, source: { time: string, resource: number }, trainer: number) => {
    if (type === DND_CREATE_TRAINING) {
      dispatch(createRecord(source, { time, resource }, trainer))
    } else if (type === DND_MOVE_TRAINING) {
      dispatch(moveRecord(source, { time, resource }, trainer))
    }
  }, [dispatch, time, resource])

  const canDrop = React.useCallback((type: typeof DND_CREATE_TRAINING | typeof DND_MOVE_TRAINING, source: { time: string, resource: number }, trainer: number) => {
    if (!isTrainerAvailableAtTime(trainer, time)) {
      return false
    }

    if (record) {
      if (type === DND_CREATE_TRAINING) {
        return false
      }

      if (type === DND_MOVE_TRAINING && !isTrainerAvailableAtTime(record.trainer.id, source.time)) {
        return false
      }
    }

    return true
  }, [record, time])

  return (
    <DropableCell onDrop={onDrop} canDrop={canDrop} isOccupied={!!record} source={source}>
      {
        record ? (
          <DragableAvatar
            type={DND_MOVE_TRAINING}
            source={source}
            trainer={record.trainer.id}
            src={record.trainer.avatar}
            tooltipRows={[
              'Rent tramp',
              'Agarkov D',
              'Very important',
            ]}
          />
        ) : null
      }
    </DropableCell>
  )
}

export default RecordCell
