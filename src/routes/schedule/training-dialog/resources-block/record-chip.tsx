import React from 'react'
import { useSelector, useActions } from 'store'

import Chip from '@material-ui/core/Chip'

import SaveIcon from '@material-ui/icons/CheckCircle'

import useUpdateTrainingRecord from '../../mutations/update-training-record'
import useDeleteTrainingRecord from '../../mutations/delete-training-record'

export default function RecordChip({ id }: any) {
  const actions = useActions()
  const { recordForm, resources, records, trainingForm, mode, isActive, record } = useSelector(state => ({
    recordForm: state.schedule.trainingDialog.recordForm,
    trainingForm: state.schedule.trainingDialog.trainingForm,
    records: state.schedule.trainingDialog.records,
    resources: state.schedule.trainingDialog.resources,
    mode: state.schedule.trainingDialog.mode,
    isActive: state.schedule.trainingDialog.recordForm?._id === id,
    record: state.schedule.trainingDialog.records.find(r => r._id === id)!,
  }))

  const updateTrainingRecord = useUpdateTrainingRecord()
  const deleteTrainingRecord = useDeleteTrainingRecord()

  const activate = React.useCallback(
    () => actions.schedule.trainingDialog.openRecord(id),
    [actions, id]
  )

  const save = React.useCallback(
    async () => {
      if (mode === 'update') {
        await updateTrainingRecord(recordForm!)
      }

      actions.schedule.trainingDialog.saveRecord()
    },
    [actions, updateTrainingRecord, recordForm, mode]
  )

  const remove = React.useCallback(
    async () => {
      if (mode === 'update') {
        await deleteTrainingRecord(trainingForm, resources, records, id)
      }

      actions.schedule.trainingDialog.removeRecord(id)
    },
    [actions, id, deleteTrainingRecord, mode, trainingForm, resources, records]
  )

  const label = React.useMemo(
    () => record.contact.fullName,
    [record]
  )

  return (
    <Chip
      label={label}
      onDelete={!isActive ? remove : save}
      color={!isActive ? 'primary' : 'secondary'}
      onClick={
        isActive
          ? save
          : !recordForm
            ? activate
            : undefined
      }
      deleteIcon={isActive ? <SaveIcon /> : undefined}
    />
  )
}
