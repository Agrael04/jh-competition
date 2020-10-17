import React, { useEffect, useMemo } from 'react'
import { useActions, useSelector } from 'store'

import CircularProgress from '@material-ui/core/CircularProgress'

import TrainingForm from './training-form'

import useGetTrainingQuery, { convertTrainingToInput } from '../../queries/get-training'

export default function TrainingDialog() {
  const actions = useActions()
  const { date, gym, _id, trainingForm } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id!,
    date: state.schedule.page.filters.date,
    gym: state.schedule.page.filters.gym,
    trainingForm: state.schedule.trainingDialog.trainingForm,
  }))

  const { data, loading } = useGetTrainingQuery(_id!)

  const initialTraining = useMemo(
    () => {
      if (loading) {
        return null
      }

      if (data?.training) {
        return convertTrainingToInput(data.training)
      }

      return {
        _id,
        gym,
        date: date.toDate(),
        traineesAmount: 1,
      }
    }, [loading, data, _id, gym, date]
  )

  useEffect(
    () => {
      if (initialTraining) {
        actions.schedule.trainingDialog.initialize(initialTraining)
      }
    }, [actions, initialTraining]
  )

  if (loading || !trainingForm) {
    return (
      <CircularProgress />
    )
  }

  return (
    <TrainingForm />
  )
}
