import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING } from '../queries/get-training'
import { ITrainingForm } from 'interfaces/training'

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
          const trainingQuery = { query: GET_TRAINING, variables: { id: data.insertOneTraining._id } }

          client.writeQuery({
            ...trainingQuery,
            data: {
              training: data.insertOneTraining,
              trainingRecords: [],
              trainingResources: [],
            },
          })
        },
      })
    },
    [createTraining]
  )

  return mutate
}

export default useCreateTraining
