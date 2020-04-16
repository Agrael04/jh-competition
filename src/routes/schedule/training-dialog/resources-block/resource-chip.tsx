import React from 'react'
import { useSelector, useActions } from 'store'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

import times from 'data/times'
import useGetGymsQuery from '../../queries/get-gyms'

import useDeleteTrainingResource from '../../mutations/delete-training-resource'

export default function ResourceChip({ id }: any) {
  const actions = useActions()
  const tr = useSelector(state => state.schedule.trainingDialog.resources.find(r => r._id === id)!)
  const isActive = useSelector(state => state.schedule.trainingDialog.resourceForm?._id === id)
  const mode = useSelector(state => state.schedule.trainingDialog.mode)
  const date = useSelector(state => state.schedule.trainingDialog.trainingForm.date)
  const { data } = useGetGymsQuery()

  const deleteTrainingResource = useDeleteTrainingResource()

  const activate = React.useCallback(
    () => actions.schedule.trainingDialog.openResource(id),
    [actions, id]
  )

  const remove = React.useCallback(
    async () => {
      if (mode === 'update') {
        await deleteTrainingResource(date, id)
      }

      actions.schedule.trainingDialog.removeResource(id)
    },
    [actions, id, deleteTrainingResource, mode, date]
  )

  const label = React.useMemo(
    () => `${times.find(t => t.id === tr.startTime)?.label} - ${times.find(t => t.id === tr.endTime)?.label}`,
    [tr]
  )

  const shortName = React.useMemo(
    () => data?.resources.find(r => r._id === tr.resource.link)?.shortName,
    [tr, data]
  )

  return (
    <Chip
      avatar={(
        <Avatar>
          {shortName}
        </Avatar>
      )}
      label={label}
      onDelete={remove}
      color={!isActive ? 'primary' : 'secondary'}
      onClick={activate}
    />
  )
}
