import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTrainingRecord from '../../../mutations/update-training-record'
import useCreateTrainingRecord from '../../../mutations/create-training-record'

import useGetTrainingQuery from '../../../queries/get-training'

export default function ResourcesBlock() {
  const actions = useActions()
  const { recordForm, recordMode } = useSelector(state => ({
    recordForm: state.schedule.trainingDialog.recordForm,
    recordMode: state.schedule.trainingDialog.recordMode,
  }))

  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)

  const updateTrainingRecord = useUpdateTrainingRecord()
  const createTrainingRecord = useCreateTrainingRecord()

  const save = React.useCallback(
    async () => {
      if (recordMode === 'update') {
        const r = trainingQuery.data?.trainingRecords.find(record => record._id === recordForm?._id)
        await updateTrainingRecord(recordForm!, r?.resource._id)
      }

      if (recordMode === 'create') {
        await createTrainingRecord(recordForm!)
      }

      actions.schedule.trainingDialog.resetRecord()
    },
    [actions, createTrainingRecord, updateTrainingRecord, recordForm, recordMode, trainingQuery]
  )

  const disabled = React.useMemo(
    () => {
      return (
        !recordForm ||
        !recordForm?.contact ||
        !recordForm?.resource
      )
    }, [recordForm]
  )
  return (
    <Button color='primary' variant='contained' onClick={save} disabled={disabled}>
      Сохранить
    </Button>
  )
}
