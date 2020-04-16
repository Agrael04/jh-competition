import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTraining from '../mutations/create-training'

export default function TrainingDialog() {
  const createTraining = useCreateTraining()

  const actions = useActions()
  const { trainingForm, resources } = useSelector(state => ({
    mode: state.schedule.trainingDialog.mode,
    trainingForm: state.schedule.trainingDialog.trainingForm,
    resources: state.schedule.trainingDialog.resources,
    recordsForm: state.schedule.trainingDialog.recordsForm,
  }))

  const save = React.useCallback(
    async () => {
      await createTraining(trainingForm, resources)

      actions.schedule.trainingDialog.close()
    },
    [actions, createTraining, trainingForm, resources]
  )

  return (
    <Button variant='contained' color='primary' onClick={save}> Сохранить </Button>
  )
}
