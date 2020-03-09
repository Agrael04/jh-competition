import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useActions } from '../../store'

import { trainerSchedule } from './data'

import { DND_CREATE_TRAINING, DND_MOVE_TRAINING } from './constants'

import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'

import { AvatarWrap } from './components/avatar-wrap'
import DropableCell from './components/dropable-cell'
import TrainingItem from './components/training-item'

import PersonAddIcon from '@material-ui/icons/PersonAdd'

import Tooltip from '../../components/multiline-tooltip'

import GET_TRAINING from './queries/get-training'
import { GetTrainingQuery } from 'generated/graphql'
import useMoveTraining from './mutations/use-move-training'

const isTrainerAvailableAtTime = (time: string, trainer?: number) => {
  if (!trainer) {
    return true
  }

  const scheduleRow = trainerSchedule.find(record => record.time === time)
  const tr = scheduleRow && scheduleRow.trainers.find(tr => tr === trainer)

  return tr !== undefined
}

interface IDropProps {
  type: typeof DND_CREATE_TRAINING | typeof DND_MOVE_TRAINING
  source: { time: string, resource: number }
  trainer: number
}

const RecordCell = ({ time, resource, id }: any) => {
  const actions = useActions()
  const moveTraining = useMoveTraining()

  const { data, loading } = useQuery<GetTrainingQuery>(GET_TRAINING, {
    variables: {
      id,
    },
    skip: !id,
  })

  const record = data?.training

  const source = React.useMemo(
    () => ({ time, resource }),
    [time, resource]
  )

  const onDrop = React.useCallback(
    ({ type, source, trainer }: IDropProps) => {
      if (type === DND_CREATE_TRAINING) {
        actions.schedule.openCreateDialog({ time, resource }, trainer)
      } else if (type === DND_MOVE_TRAINING) {
        moveTraining(source, { time, resource })
      }
    },
    [time, resource, actions, moveTraining]
  )

  const canDrop = React.useCallback(
    ({ type, source, trainer }: IDropProps) => {
      if (loading) {
        return false
      }

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

        if (type === DND_MOVE_TRAINING && !isTrainerAvailableAtTime(source.time, record?.trainer!)) {
          return false
        }
      }

      return true
    },
    [record, time, resource, loading]
  )

  const handleDoubleClick = React.useCallback(
    e => {
      e.stopPropagation()
      if (record) {
        actions.schedule.openUpdateDialog(record as any)
      } else {
        actions.schedule.openCreateDialog({ resource, time })
      }
    },
    [record, actions, resource, time]
  )

  return (
    <DropableCell onDrop={onDrop} canDrop={canDrop} isOccupied={!loading && !!record} source={source} colorId={!loading && record?.trainer}>
      {
        loading && (
          <CircularProgress />
        )
      }
      {
        !loading && !record && (
          <AvatarWrap
            handleDoubleClick={handleDoubleClick}
          >
            <Tooltip rows={['Добавить тренировку']}>
              <Avatar>
                <PersonAddIcon />
              </Avatar>
            </Tooltip>
          </AvatarWrap>
        )
      }
      {
        !loading && record && (
          <TrainingItem record={record as any} />
        )
      }
    </DropableCell>
  )
}

export default RecordCell
