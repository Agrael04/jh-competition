import React from 'react'

import removeTimeFromDate from 'utils/remove-time-from-date'
import { useSelector, useActions } from 'store'
import api from 'api/mongodb/training'
import client from 'api/mongodb/graphql'

import GET_TRAININGS from '../queries/get-trainings'
import { GetTrainingsQuery } from 'generated/graphql'

export default () => {
  const actions = useActions()
  const training = useSelector(state => state.schedule.recordForm)

  const mutate = React.useCallback(
    async () => {
      const variables = {
        date: removeTimeFromDate(training.date),
      }

      try {
        const res = await api.createTraining(training)

        const newTraining = {
          _id: res.toString(),
          time: training.time,
          resource: training.resource,
          trainer: training.trainer,
          __typename: 'Training',
        }

        const data = client?.readQuery<GetTrainingsQuery>({ query: GET_TRAININGS, variables })

        client?.writeQuery({
          query: GET_TRAININGS,
          variables,
          data: {
            trainings: [...data?.trainings!, newTraining],
          },
        })

        actions.schedule.closeRecordDialog()
      } catch (e) {
        console.log(e)
      }
    },
    [actions, training]
  )

  return mutate
}
