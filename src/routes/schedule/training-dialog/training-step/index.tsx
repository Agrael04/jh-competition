import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store'
import { createSelector } from 'reselect'
import moment from 'moment'

import CircularProgress from '@material-ui/core/CircularProgress'

import { openUpdateTrainingForm, openCreateTrainingForm } from 'store/ui/pages/schedule/training-dialog/actions'

import { selectState as selectTrainingDialogState } from 'store/ui/pages/schedule/training-dialog/selectors'
import { selectPageFilters } from 'store/ui/pages/schedule/page/selectors'

import TrainingForm from './training-form'

import useGetTrainingQuery from '../../queries/get-training'

const selectProps = createSelector(
  selectTrainingDialogState,
  selectPageFilters,
  (trainingDialogState, filters) => ({
    isActive: trainingDialogState.trainingForm.isActive,
    _id: trainingDialogState._id,
    date: filters.date,
    gym: filters.gym,
  })
)

export default function TrainingDialog() {
  const dispatch = useDispatch()
  const { _id, isActive, date, gym } = useSelector(selectProps)

  const { data, loading } = useGetTrainingQuery(_id)

  useEffect(
    () => {
      if (!loading && gym) {
        if (data?.training && _id) {
          dispatch(openUpdateTrainingForm(
            _id,
            {
              gym: { link: data.training.gym._id },
              date: moment(data.training.date),
              name: data.training.name,
              type: data.training.type,
              traineesAmount: data.training.traineesAmount,
              note: data.training.note,
            }
          ))
        } else {
          dispatch(openCreateTrainingForm({
            gym: { link: gym },
            date,
            traineesAmount: 1,
          }))
        }
      }
    }, [_id, data, gym, date, loading]
  )

  if (loading || !isActive) {
    return (
      <CircularProgress />
    )
  }

  return (
    <TrainingForm />
  )
}
