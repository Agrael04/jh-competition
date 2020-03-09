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
      try {
        const trainingsVariables = {
          date: removeTimeFromDate(new Date(training.date)),
        }

        if (!training._id) {
          return
        }

        await api.deleteTraining(training._id, training.records)

        const { trainings } = client?.readQuery({ query: GET_TRAININGS, variables: trainingsVariables }) as any

        client?.writeQuery({
          query: GET_TRAININGS,
          variables: trainingsVariables,
          data: {
            trainings: trainings.filter((tr: any) => tr._id !== training._id),
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
