import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTrainingRecord from '../../../mutations/update-training-record'
import useCreateTrainingRecord from '../../../mutations/create-training-record'

export default function ResourcesBlock() {
  const actions = useActions()
  const { recordForm, records, mode, recordMode } = useSelector(state => ({
    recordForm: state.schedule.trainingDialog.recordForm,
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
          const r = records.find(record => record._id === recordForm?._id)
          await updateTrainingRecord(recordForm!, r?.resource.link)
        }

        if (recordMode === 'create') {
          await createTrainingRecord(recordForm!)
        }
      }

      actions.schedule.trainingDialog.saveRecord()
    },
    [actions, createTrainingRecord, updateTrainingRecord, recordForm, mode, recordMode, records]
  )

  return (
    <Button color='primary' variant='contained' onClick={save}>
      Сохранить
    </Button>
  )
}
