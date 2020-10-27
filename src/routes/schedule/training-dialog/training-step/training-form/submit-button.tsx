import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTraining from '../../../mutations/update-training'
import useCreateTraining from '../../../mutations/create-training'
import useGetTrainingQuery from '../../../queries/get-training'

import ITrainingForm from './form'

export default function TrainingDialog() {
  const { step, _id } = useSelector(state => ({
    step: state.schedule.trainingDialog.step,
    _id: state.schedule.trainingDialog._id,
  }))
  const createTraining = useCreateTraining()
  const updateTraining = useUpdateTraining()

  const { handleSubmit, errors } = useFormContext()
  const disabled = Object.keys(errors).length > 0

  const actions = useActions()

  const trainingQuery = useGetTrainingQuery(_id!)

  const submit = React.useCallback(
    async (trainingForm: ITrainingForm) => {
      if (trainingQuery.data?.training) {
        await updateTraining(trainingForm)
      } else {
        const res = await createTraining(trainingForm)

        if (res.data) {
          actions.schedule.trainingDialog.closeTraining()
          actions.schedule.trainingDialog.setTrainingId(res.data.insertOneTraining._id)
          actions.schedule.trainingDialog.setStep(step + 1)
        }
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
