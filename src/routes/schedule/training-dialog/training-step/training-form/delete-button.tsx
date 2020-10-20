import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useDeleteTraining from '../../../mutations/delete-training'

import useGetTrainingQuery from '../../../queries/get-training'

export default function TrainingDialog() {
  const { mode, _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
    mode: state.schedule.trainingDialog.trainingForm.mode,
  }))
  const trainingQuery = useGetTrainingQuery(_id)

  const actions = useActions()
  const deleteTraining = useDeleteTraining()

  const remove = React.useCallback(
    async () => {
      await deleteTraining()

      actions.schedule.trainingDialog.close()
    },
    [actions, deleteTraining]
  )

  const disabled = React.useMemo(
    () => {
      return trainingQuery.data?.trainingRecords.length! > 0
    }, [trainingQuery]
  )

  if (mode === 'create') {
    return <div />
  }

  return (
    <Button variant='text' color='primary' onClick={remove} disabled={disabled}> Удалить </Button>
  )
}
