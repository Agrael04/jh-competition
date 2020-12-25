import { useCallback } from 'react'
import { useSelector, useDispatch } from 'store'
import { createSelector } from 'reselect'
import { useFormContext } from 'react-hook-form'

import Button from '@material-ui/core/Button'

import { closeTraining, setTrainingId, setStep } from 'store/ui/pages/schedule/training-dialog/actions'

import { selectState, selectTrainingId } from 'store/ui/pages/schedule/training-dialog/selectors'

import useUpdateTraining from '../../../mutations/update-training'
import useCreateTraining from '../../../mutations/create-training'
import useGetTrainingQuery from '../../../queries/get-training'

import ITrainingForm from './form'

const selectProps = createSelector(
  selectState,
  selectTrainingId,
  (state, _id) => ({
    step: state.step,
    _id,
  })
)

export default function TrainingDialog() {
  const dispatch = useDispatch()
  const { step, _id } = useSelector(selectProps)
  const createTraining = useCreateTraining()
  const updateTraining = useUpdateTraining()

  const { handleSubmit, errors } = useFormContext()
  const disabled = Object.keys(errors).length > 0

  const trainingQuery = useGetTrainingQuery(_id!)

  const submit = useCallback(
    async (trainingForm: ITrainingForm) => {
      if (trainingQuery.data?.training) {
        await updateTraining(trainingForm)
      } else {
        const res = await createTraining(trainingForm)

        if (res.data) {
          dispatch(closeTraining())
          dispatch(setTrainingId(res.data.insertOneTraining._id))
          dispatch(setStep(step + 1))
        }
      }
    },
    [updateTraining, createTraining, trainingQuery, step]
  )

  return (
    <Button variant='contained' color='primary' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
