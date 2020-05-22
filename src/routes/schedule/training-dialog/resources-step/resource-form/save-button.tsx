import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTrainingResource from '../../../mutations/update-training-resource'
import useCreateTrainingResource from '../../../mutations/create-training-resource'

export default function ResourcesBlock() {
  const actions = useActions()
  const { resourceForm, trainingForm, resourceMode } = useSelector(state => ({
    resourceForm: state.schedule.trainingDialog.resourceForm,
    trainingForm: state.schedule.trainingDialog.trainingForm,
    resourceMode: state.schedule.trainingDialog.resourceMode,
  }))

  const updateTrainingResource = useUpdateTrainingResource()
  const createTrainingResource = useCreateTrainingResource()

  const save = React.useCallback(
    async () => {
      if (resourceMode === 'update') {
        await updateTrainingResource(resourceForm!)
      }

      if (resourceMode === 'create') {
        await createTrainingResource(trainingForm!, resourceForm!)
      }

      actions.schedule.trainingDialog.resetResource()
    },
    [actions, createTrainingResource, updateTrainingResource, trainingForm, resourceForm, resourceMode]
  )

  return (
    <Button color='primary' variant='contained' onClick={save}>
      Сохранить
    </Button>
  )
}
