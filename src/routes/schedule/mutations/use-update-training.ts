import React from 'react'

import { useSelector, useActions } from 'store'
import api from 'api/mongodb/training'
import client from 'api/mongodb/graphql'

import GET_TRAINING from '../queries/get-training'
import { GetTrainingQuery } from 'generated/graphql'

export default () => {
  const actions = useActions()
  const newTraining = useSelector(state => state.schedule.recordForm)

  const mutate = React.useCallback(
    async () => {
      try {
        const trainingVariables = {
          id: newTraining._id,
        }

        const data = client?.readQuery<GetTrainingQuery>({ query: GET_TRAINING, variables: trainingVariables })

        if (!data?.training?.records) {
          return
        }

        const records = await api.updateTraining(data.training.records as any, newTraining)

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
