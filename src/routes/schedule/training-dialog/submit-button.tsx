import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTraining from '../mutations/create-training'

export default function TrainingDialog() {
  const createTraining = useCreateTraining()
  const [sent, setSent] = React.useState(false)

  const actions = useActions()
  const { trainingForm, resources, resourceForm } = useSelector(state => ({
    mode: state.schedule.trainingDialog.mode,
    trainingForm: state.schedule.trainingDialog.trainingForm,
    resources: state.schedule.trainingDialog.resources,
    resourceForm: state.schedule.trainingDialog.resourceForm,
    recordsForm: state.schedule.trainingDialog.recordsForm,
  }))

  const handleSave = React.useCallback(
    async () => {
      if (!sent) {
        setSent(true)
        actions.schedule.trainingDialog.saveResource()
      }
    },
    [actions, setSent, sent]
  )

  const save = React.useCallback(
    async () => {
      await createTraining(trainingForm, resources)

      setSent(false)
      actions.schedule.trainingDialog.close()
    },
    [actions, trainingForm, resources, createTraining, setSent]
  )

  React.useEffect(
    () => {
      if (sent && resourceForm === null) {
        save()
      }
    },
    [sent, resourceForm, trainingForm, save]
  )

  return (
    <Button variant='contained' color='primary' onClick={handleSave}> Сохранить </Button>
  )
}
