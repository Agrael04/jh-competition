import React from 'react'
import { IStoreState, useSelector, useActions } from '../../store'

import { trainerSchedule, trainers } from './data'

import { DND_CREATE_TRAINING, DND_MOVE_TRAINING } from './constants'

import DragableAvatar from './components/dragable-avatar'
import EmptyAvatar from './components/empty-avatar'
import DropableCell from './components/dropable-cell'

import PersonAddIcon from '@material-ui/icons/PersonAdd'

const isTrainerAvailableAtTime = (time: string, trainer?: number) => {
  if (!trainer) {
    return true
  }

  const scheduleRow = trainerSchedule.find(record => record.time === time)
  const tr = scheduleRow && scheduleRow.trainers.find(tr => tr === trainer)

  return tr !== undefined
}

const selector =
  (time: string, resource: number) =>
    (state: IStoreState) => state.schedule.schedule.find(
      record => record.time === time && record.resource === resource
    )

interface IDropProps {
  type: typeof DND_CREATE_TRAINING | typeof DND_MOVE_TRAINING
  source: { time: string, resource: number }
  trainer: number
}

const RecordCell = ({ time, resource }: any) => {
  const record = useSelector(selector(time, resource))
  const actions = useActions()

  const trainer = React.useMemo(
    () => record && trainers.find(tr => tr.id === record.trainer),
    [record]
  )

  const source = React.useMemo(
    () => ({ time, resource }),
    [time, resource]
  )

  const onDrop = React.useCallback(
    ({ type, source, trainer}: IDropProps) => {
      if (type === DND_CREATE_TRAINING) {
        actions.schedule.openCreateDialog({
          gym: 1,
          date: new Date(),
          trainer,
          time,
          resource,
          trainees: [],
        })
      } else if (type === DND_MOVE_TRAINING) {
        actions.schedule.moveRecord(source, { time, resource }, trainer)
      }
    },
    [time, resource, actions]
  )

  const canDrop = React.useCallback(
    ({ type, source, trainer}: IDropProps) => {
      if (source.time === time && source.resource === resource) {
        return false
      }

      if (!isTrainerAvailableAtTime(time, trainer)) {
        return false
      }

      if (record) {
        if (type === DND_CREATE_TRAINING) {
          return false
        }

        if (type === DND_MOVE_TRAINING && !isTrainerAvailableAtTime(source.time, record?.trainer)) {
          return false
        }
      }

      return true
    },
    [record, time, resource]
  )

  const handleDoubleClick = React.useCallback(
    e => {
      e.stopPropagation()
      if (record) {
        actions.schedule.openUpdateDialog(record)
      } else {
        actions.schedule.openCreateDialog({ gym: 1, resource, time, date: new Date(), trainees: [] })
      }
    },
    [record, actions, resource, time]
  )

  return (
    <DropableCell onDrop={onDrop} canDrop={canDrop} isOccupied={!!record} source={source} colorId={record?.trainer}>
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
        ) : (
            <EmptyAvatar
              handleDoubleClick={handleDoubleClick}
              tooltipRows={[
                'Add new',
              ]}
            >
              <PersonAddIcon />
            </EmptyAvatar>
          )
      }
    </DropableCell>
  )
}

export default RecordCell
