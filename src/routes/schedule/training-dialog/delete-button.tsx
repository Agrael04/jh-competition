import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useDeleteTraining from '../mutations/delete-training'

export default function TrainingDialog() {
  const { dialogMode, trainingForm } = useSelector(state => state.schedule)
  const actions = useActions()
  const deleteTraining = useDeleteTraining()

  const remove = React.useCallback(
    async () => {
      await deleteTraining(trainingForm)

      actions.schedule.closeRecordDialog()
    },
    [actions, trainingForm, deleteTraining]
  )

  if (dialogMode === 'create') {
    return <div />
  }

  return (
    <Button variant='text' color='primary' onClick={remove}> Удалить </Button>
  )
}
