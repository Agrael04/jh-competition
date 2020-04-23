import React from 'react'
import { useSelector, useActions } from 'store'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

import AddIcon from '@material-ui/icons/Add'

import useCreateTrainingRecord from '../../mutations/create-training-record'

export default function ResourceBlock() {
  const actions = useActions()
  const { trainingForm, mode, recordForm, recordMode, records } = useSelector(state => ({
    trainingForm: state.schedule.trainingDialog.trainingForm,
    mode: state.schedule.trainingDialog.mode,
    recordForm: state.schedule.trainingDialog.recordForm,
    recordMode: state.schedule.trainingDialog.recordMode,
    records: state.schedule.trainingDialog.records,
  }))

  const createTrainingRecord = useCreateTrainingRecord()

  const activate = React.useCallback(
    async () => {
      actions.schedule.trainingDialog.openRecord()
    },
    [actions]
  )

  const save = React.useCallback(
    async () => {
      if (mode === 'update') {
        await createTrainingRecord(trainingForm!, records!, recordForm!)
      }

      actions.schedule.trainingDialog.saveRecord()
    },
    [actions, recordForm, mode, trainingForm, createTrainingRecord, records]
  )

  return (
    <Chip
      avatar={<Avatar><AddIcon /></Avatar>}
      label={'Добавить'}
      color={recordMode === 'create' ? 'secondary' : 'primary'}
      variant={recordMode === 'create' ? undefined : 'outlined'}
      onClick={
        recordMode === 'create'
          ? save
          : !recordForm
            ? activate
            : undefined
      }
    />
  )
}
