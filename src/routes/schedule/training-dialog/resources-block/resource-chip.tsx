import React from 'react'
import { useSelector, useActions } from 'store'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

import SaveIcon from '@material-ui/icons/CheckCircle'

import times from 'data/times'
import useGetGymsQuery from '../../queries/get-gyms'

import useUpdateTrainingResource from '../../mutations/update-training-resource'
import useDeleteTrainingResource from '../../mutations/delete-training-resource'

export default function ResourceChip({ id }: any) {
  const actions = useActions()
  const { resourceForm, trainingForm, mode, isActive, resource } = useSelector(state => ({
    resourceForm: state.schedule.trainingDialog.resourceForm,
    trainingForm: state.schedule.trainingDialog.trainingForm,
    mode: state.schedule.trainingDialog.mode,
    isActive: state.schedule.trainingDialog.resourceForm?._id === id,
    resource: state.schedule.trainingDialog.resources.find(r => r._id === id)!,
  }))
  const { data } = useGetGymsQuery()

  const updateTrainingResource = useUpdateTrainingResource()
  const deleteTrainingResource = useDeleteTrainingResource()

  const activate = React.useCallback(
    () => actions.schedule.trainingDialog.openResource(id),
    [actions, id]
  )

  const save = React.useCallback(
    async () => {
      if (mode === 'update') {
        await updateTrainingResource(resourceForm!)
      }

      actions.schedule.trainingDialog.saveResource()
    },
    [actions, updateTrainingResource, resourceForm, mode]
  )

  const remove = React.useCallback(
    async () => {
      if (mode === 'update') {
        await deleteTrainingResource(trainingForm, id)
      }

      actions.schedule.trainingDialog.removeResource(id)
    },
    [actions, id, deleteTrainingResource, mode, trainingForm]
  )

  const label = React.useMemo(
    () => `${times.find(t => t.id === resource.startTime)?.label} - ${times.find(t => t.id === resource.endTime)?.label}`,
    [resource]
  )

  const shortName = React.useMemo(
    () => data?.resources.find(r => r._id === resource.resource.link)?.shortName,
    [resource, data]
  )

  return (
    <Chip
      avatar={<Avatar>{shortName}</Avatar>}
      label={label}
      onDelete={!isActive ? remove : save}
      color={!isActive ? 'primary' : 'secondary'}
      onClick={
        isActive
          ? save
          : !resourceForm
            ? activate
            : undefined
      }
      deleteIcon={isActive ? <SaveIcon /> : undefined}
    />
  )
}
