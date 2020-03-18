import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTraining from '../mutations/create-training'
import useUpdateTraining from '../mutations/update-training'
import useCreateTrainingRecords from '../mutations/create-training-records'

export default function TrainingDialog() {
  const { dialogMode, trainingForm, recordsForm } = useSelector(state => state.schedule)
  const actions = useActions()
  const createTraining = useCreateTraining()
  const updateTraining = useUpdateTraining()
  const createTrainingRecords = useCreateTrainingRecords()

  const save = React.useCallback(
    async () => {
      const records = recordsForm

      if (dialogMode === 'create') {
        await createTraining(trainingForm)
      } else {
        await updateTraining(trainingForm)
      }

      if (records.length > 0) {
        await createTrainingRecords(trainingForm._id, records)
      }

      actions.schedule.closeRecordDialog()
    },
    [actions, dialogMode, createTraining, updateTraining, createTrainingRecords, trainingForm, recordsForm]
  )

  return (
    <Button variant='contained' color='primary' onClick={save}> Сохранить </Button>
  )
}
