import { useCallback } from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTrainingRecord from '../../../mutations/update-training-record'
import useCreateTrainingRecord from '../../../mutations/create-training-record'

import useGetTrainingQuery from '../../../queries/get-training'

import IRecordForm from './form'

export default function RecordsBlock() {
  const actions = useActions()
  const form = useSelector(state => state.schedule.trainingDialog.recordForm)
  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
  }))

  const trainingQuery = useGetTrainingQuery(_id)
  const updateTrainingRecord = useUpdateTrainingRecord()
  const createTrainingRecord = useCreateTrainingRecord()

  const { handleSubmit, errors } = useFormContext()
  const disabled = Object.keys(errors).length > 0

  const submit = useCallback(
    async (record: IRecordForm) => {
      if (!form.mode) {
        return
      }

      if (form.mode === 'update' && form._id) {
        const r = trainingQuery.data?.trainingRecords.find(record => record._id === record?._id)

        if (!r) {
          return
        }

        await updateTrainingRecord(form._id, record, r.resource._id)
      }

      if (form.mode === 'create') {
        await createTrainingRecord(record)
      }

      actions.schedule.trainingDialog.closeRecord()
    },
    [form, trainingQuery, updateTrainingRecord, createTrainingRecord, actions]
  )

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
