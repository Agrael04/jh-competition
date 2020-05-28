import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTraining from '../mutations/update-training'

export default function TrainingDialog() {
  const updateTraining = useUpdateTraining()

  const actions = useActions()
  const { trainingForm } = useSelector(state => ({
    trainingForm: state.schedule.trainingDialog.trainingForm,
  }))

  const save = React.useCallback(
    async () => {
      await updateTraining(trainingForm)

      actions.schedule.trainingDialog.close()
    },
    [actions, updateTraining, trainingForm]
  )

  const disabled = React.useMemo(
    () => {
      return (!trainingForm.type || !trainingForm.traineesAmount)
    }, [trainingForm]
  )

  return (
    <Button variant='contained' color='primary' onClick={save} disabled={disabled}> Сохранить </Button>
  )
}
