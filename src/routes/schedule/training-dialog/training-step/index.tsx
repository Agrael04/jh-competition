import React, { useEffect, useMemo } from 'react'
import { useActions, useSelector } from 'store'
import moment from 'moment'

import CircularProgress from '@material-ui/core/CircularProgress'

import TrainingForm from './training-form'

import useGetTrainingQuery from '../../queries/get-training'

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
        return {
          gym: { link: data.training.gym._id },
          date: moment(data.training.date),
          name: data.training.name,
          type: data.training.type,
          traineesAmount: data.training.traineesAmount,
          note: data.training.note,
        }
      }

      if (!gym) {
        return null
      }

      return {
        gym,
        date,
        traineesAmount: 1,
      }
    }, [loading, data, gym, date]
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
