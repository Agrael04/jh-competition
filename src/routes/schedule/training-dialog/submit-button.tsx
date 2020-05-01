import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTraining from '../mutations/create-training'

export default function TrainingDialog() {
  const createTraining = useCreateTraining()

  const actions = useActions()
  const { trainingForm, step } = useSelector(state => ({
    trainingForm: state.schedule.trainingDialog.trainingForm,
    step: state.schedule.trainingDialog.step,
  }))

  const save = React.useCallback(
    async () => {
      await createTraining(trainingForm)

      actions.schedule.trainingDialog.setStep(step + 1)
    },
    [actions, trainingForm, createTraining, step]
  )

  return (
    <Button variant='contained' color='primary' onClick={save}> Сохранить </Button>
  )
}
