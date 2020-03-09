import React from 'react'

import { useSelector, useActions } from 'store'
import api from 'api/mongodb/training'
import client from 'api/mongodb/graphql'

import GET_TRAINING from '../queries/get-training'

export default () => {
  const actions = useActions()
  const newTraining = useSelector(state => state.schedule.recordForm)

  const mutate = React.useCallback(
    async () => {
      try {
        const trainingVariables = {
          id: newTraining._id,
        }

        const { training } = client?.readQuery({ query: GET_TRAINING, variables: trainingVariables }) as any

        if (!training) {
          return
        }

        const records = await api.updateTraining(training, newTraining)

        client?.writeQuery({
          query: GET_TRAINING,
          variables: trainingVariables,
          data: {
            training: {
              ...newTraining,
              records: records.map((r: any) => ({
                ...r,
                __typename: 'TrainingRecord',
                trainee: {
                  ...r.trainee,
                  __typename: 'User',
                },
              })),
            },
          },
        })

        actions.schedule.closeRecordDialog()
      } catch (e) {
        console.log(e)
      }
    },
    [actions, newTraining]
  )

  return mutate
}
