import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTrainingRecord from '../../../mutations/update-training-record'
import useCreateTrainingRecord from '../../../mutations/create-training-record'

export default function ResourcesBlock() {
  const actions = useActions()
  const { recordForm, trainingForm, records, mode, recordMode } = useSelector(state => ({
    recordForm: state.schedule.trainingDialog.recordForm,
    trainingForm: state.schedule.trainingDialog.trainingForm,
    recordMode: state.schedule.trainingDialog.recordMode,
    mode: state.schedule.trainingDialog.mode,
    records: state.schedule.trainingDialog.records,
  }))

  const updateTrainingRecord = useUpdateTrainingRecord()
  const createTrainingRecord = useCreateTrainingRecord()

  const save = React.useCallback(
    async () => {
      if (mode === 'update') {
        if (recordMode === 'update') {
          await updateTrainingRecord(recordForm!)
        }

        if (recordMode === 'create') {
          await createTrainingRecord(trainingForm!, records!, recordForm!)
        }
      }

      actions.schedule.trainingDialog.saveResource()
    },
    [actions, createTrainingRecord, updateTrainingRecord, trainingForm, recordForm, mode, recordMode, records]
  )

  return (
    <Button color='primary' variant='contained' onClick={save}>
      Сохранить
    </Button>
  )
}
