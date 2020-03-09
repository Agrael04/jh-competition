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
      try {
        const trainingsVariables = {
          date: removeTimeFromDate(new Date(training.date)),
        }

        if (!training._id) {
          return
        }

        await api.deleteTraining(training._id, training.records)

        const data = client?.readQuery<GetTrainingsQuery>({ query: GET_TRAININGS, variables: trainingsVariables })

        client?.writeQuery({
          query: GET_TRAININGS,
          variables: trainingsVariables,
          data: {
            trainings: data?.trainings.filter(tr => tr?._id !== training._id),
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
