import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useDeleteTraining from '../mutations/delete-training'

export default function TrainingDialog() {
  const { mode, trainingForm, resources, records } = useSelector(state => ({
    mode: state.schedule.trainingDialog.mode,
    trainingForm: state.schedule.trainingDialog.trainingForm,
    resources: state.schedule.trainingDialog.resources,
    records: state.schedule.trainingDialog.records,
  }))

  const actions = useActions()
  const deleteTraining = useDeleteTraining()

  const remove = React.useCallback(
    async () => {
      await deleteTraining(trainingForm, resources, records)

      actions.schedule.trainingDialog.close()
    },
    [actions, trainingForm, resources, records, deleteTraining]
  )

  if (mode === 'create') {
    return <div />
  }

  return (
    <Button variant='text' color='primary' onClick={remove}> Удалить </Button>
  )
}
