import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState } from '../../store'

import { trainerSchedule, trainers } from './data'

import { DND_CREATE_TRAINING, DND_MOVE_TRAINING } from './constants'

import DragableAvatar from './components/dragable-avatar'
import DropableCell from './components/dropable-cell'

import actions from '../../store/actions'

const isTrainerAvailableAtTime = (trainer: number, time: string) => {
  const scheduleRow = trainerSchedule.find(record => record.time === time)
  const tr = scheduleRow && scheduleRow.trainers.find(tr => tr === trainer)

  return tr !== undefined
}

const selector =
  (time: string, resource: number) =>
    (state: IStoreState) => state.schedule.schedule.find(
      record => record.time === time && record.resource === resource
    )

const RecordCell = ({ time, resource }: any) => {
  const record = useSelector(selector(time, resource))
  const dispatch = useDispatch()

  const trainer = React.useMemo(
    () => record && trainers.find(tr => tr.id === record.trainer),
    [record, trainers]
  )

  const source = React.useMemo(
    () => ({ time, resource }),
    [time, resource]
  )

  const onDrop = React.useCallback(
    (type: typeof DND_CREATE_TRAINING | typeof DND_MOVE_TRAINING, source: { time: string, resource: number }, trainer: number) => {
      if (type === DND_CREATE_TRAINING) {
        dispatch(actions.schedule.openCreateDialog({
          gym: 1,
          date: new Date(),
          trainer,
          time,
          resource,
        }))
      } else if (type === DND_MOVE_TRAINING) {
        dispatch(actions.schedule.moveRecord(source, { time, resource }, trainer))
      }
    },
    [dispatch, time, resource]
  )

  const canDrop = React.useCallback(
    (type: typeof DND_CREATE_TRAINING | typeof DND_MOVE_TRAINING, source: { time: string, resource: number }, trainer: number) => {
      if (!isTrainerAvailableAtTime(trainer, time)) {
        return false
      }

      if (record) {
        if (type === DND_CREATE_TRAINING) {
          return false
        }

        if (type === DND_MOVE_TRAINING && !isTrainerAvailableAtTime(record.trainer, source.time)) {
          return false
        }
      }

      return true
    },
    [record, time]
  )

  const handleDoubleClick = React.useCallback(
    () => record && dispatch(actions.schedule.openUpdateDialog(record)),
    [dispatch, record]
  )

  return (
    <DropableCell onDrop={onDrop} canDrop={canDrop} isOccupied={!!record} source={source}>
      {
        record ? (
          <DragableAvatar
            type={DND_MOVE_TRAINING}
            source={source}
            trainer={record.trainer}
            src={trainer && trainer.avatar}
            handleDoubleClick={handleDoubleClick}
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
