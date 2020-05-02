import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { ITrainingForm } from 'interfaces/training'

import { updateCachedQuery } from './cache-updaters'

export const CREATE_TRAINING = gql`
  mutation createTraining ($training: TrainingInsertInput!) {
    insertOneTraining(data: $training) {
      _id
      date
      startTime
      endTime
      gym {
        _id
      }
      name
      type
      traineesCount
      note
    }
  }
`

const useCreateTraining = () => {
  const [createTraining] = useMutation(CREATE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm) => {
      return createTraining({
        variables: { training },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateCachedQuery(client)
          const updater = () => ({
            training: data.insertOneTraining,
            trainingRecords: [],
            trainingResources: [],
          })

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: training._id },
            updater,
          })
        },
      })
    },
    [createTraining]
  )

  return mutate
}

export default useCreateTraining
