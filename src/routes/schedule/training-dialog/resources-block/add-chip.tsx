import React from 'react'
import { useSelector, useActions } from 'store'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

import AddIcon from '@material-ui/icons/Add'

import useCreateTrainingResource from '../../mutations/create-training-resource'

export default function ResourceBlock() {
  const actions = useActions()
  const { trainingForm, mode, resourceForm, resourceMode } = useSelector(state => ({
    trainingForm: state.schedule.trainingDialog.trainingForm,
    mode: state.schedule.trainingDialog.mode,
    resourceForm: state.schedule.trainingDialog.resourceForm,
    resourceMode: state.schedule.trainingDialog.resourceMode,
  }))

  const createTrainingResource = useCreateTrainingResource()

  const activate = React.useCallback(
    async () => {
      actions.schedule.trainingDialog.openResource()
    },
    [actions]
  )

  const save = React.useCallback(
    async () => {
      if (mode === 'update') {
        await createTrainingResource(trainingForm!, resourceForm!)
      }

      actions.schedule.trainingDialog.saveResource()
    },
    [actions, resourceForm, mode, trainingForm, createTrainingResource]
  )

  return (
    <Chip
      avatar={<Avatar><AddIcon /></Avatar>}
      label={'Добавить'}
      color={resourceMode === 'create' ? 'secondary' : 'primary'}
      variant={resourceMode === 'create' ? undefined : 'outlined'}
      onClick={
        resourceMode === 'create'
          ? save
          : !resourceForm
            ? activate
            : undefined
      }
    />
  )
}
