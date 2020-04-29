import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTraining from '../mutations/create-training'

export default function TrainingDialog() {
  const createTraining = useCreateTraining()
  const [sent, setSent] = React.useState(false)

  const actions = useActions()
  const { trainingForm, resources, resourceForm, records, recordForm } = useSelector(state => ({
    mode: state.schedule.trainingDialog.mode,
    trainingForm: state.schedule.trainingDialog.trainingForm,
    resources: state.schedule.trainingDialog.resources,
    resourceForm: state.schedule.trainingDialog.resourceForm,
    records: state.schedule.trainingDialog.records,
    recordForm: state.schedule.trainingDialog.recordForm,
    recordsForm: [],
  }))

  const handleSave = React.useCallback(
    async () => {
      if (!sent) {
        setSent(true)
        actions.schedule.trainingDialog.saveResource()
        actions.schedule.trainingDialog.saveRecord()
      }
    },
    [actions, setSent, sent]
  )

  const save = React.useCallback(
    async () => {
      await createTraining(trainingForm, resources, records)

      setSent(false)
      actions.schedule.trainingDialog.close()
    },
    [actions, trainingForm, resources, records, createTraining, setSent]
  )

  React.useEffect(
    () => {
      if (sent && resourceForm === null && recordForm === null) {
        save()
      }
    },
    [sent, resourceForm, recordForm, trainingForm, save]
  )

  return (
    <Button variant='contained' color='primary' onClick={handleSave}> Сохранить </Button>
  )
}
