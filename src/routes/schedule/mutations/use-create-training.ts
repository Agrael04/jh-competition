import React from 'react'

import removeTimeFromDate from 'utils/remove-time-from-date'
import { useSelector, useActions } from 'store'
import api from 'api/mongodb/training'
import client from 'api/mongodb/graphql'

import GET_TRAININGS from '../queries/get-trainings'

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

        const { trainings } = client?.readQuery({ query: GET_TRAININGS, variables }) as any

        client?.writeQuery({
          query: GET_TRAININGS,
          variables,
          data: {
            trainings: [...trainings, newTraining],
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
