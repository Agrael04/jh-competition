import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTraining from '../../../mutations/update-training'
import useCreateTraining from '../../../mutations/create-training'
import useGetTrainingQuery from '../../../queries/get-training'

export default function TrainingDialog() {
  const _id = useSelector(state => state.schedule.trainingDialog._id)
  const createTraining = useCreateTraining()
  const updateTraining = useUpdateTraining()

  const { handleSubmit, errors } = useFormContext()
  const disabled = Object.keys(errors).length > 0

  const actions = useActions()
  const { step } = useSelector(state => ({
    step: state.schedule.trainingDialog.step,
  }))

  const trainingQuery = useGetTrainingQuery(_id!)

  const submit = React.useCallback(
    async (trainingForm: any) => {
      if (trainingQuery.data?.training) {
        await updateTraining(trainingForm)

        actions.schedule.trainingDialog.close()
      } else {
        await createTraining(trainingForm)

        actions.schedule.trainingDialog.setStep(step + 1)
      }
    },
    [actions, updateTraining, createTraining, trainingQuery, step]
  )

  return (
    <Button variant='contained' color='primary' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
