import React, { useEffect } from 'react'
import { useActions, useSelector } from 'store'
import moment from 'moment'

import CircularProgress from '@material-ui/core/CircularProgress'

import TrainingForm from './training-form'

import useGetTrainingQuery from '../../queries/get-training'

export default function TrainingDialog() {
  const actions = useActions()
  const { date, gym, _id, isActive } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
    date: state.schedule.page.filters.date,
    gym: state.schedule.page.filters.gym,
    isActive: state.schedule.trainingDialog.trainingForm.isActive,
  }))

  const { data, loading } = useGetTrainingQuery(_id)

  useEffect(
    () => {
      if (!loading && gym) {
        if (data?.training && _id) {
          actions.schedule.trainingDialog.openUpdateTrainingForm(
            _id,
            {
              gym: { link: data.training.gym._id },
              date: moment(data.training.date),
              name: data.training.name,
              type: data.training.type,
              traineesAmount: data.training.traineesAmount,
              note: data.training.note,
            }
          )
        } else {
          actions.schedule.trainingDialog.openCreateTrainingForm({
            gym: { link: gym },
            date,
            traineesAmount: 1,
          })
        }
      }
    }, [actions, _id, data, gym, date, loading]
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
