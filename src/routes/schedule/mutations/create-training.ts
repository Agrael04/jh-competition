import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAININGS, IGetTrainingsResponse } from '../queries/get-trainings'
import { ITrainingForm } from 'interfaces/training'

export const CREATE_TRAINING = gql`
  mutation createTraining ($training: TrainingInsertInput!) {
    insertOneTraining(data: $training) {
      _id
      resource {
        _id
      }
      trainer {
        _id
        firstName
        lastName
        color
        avatarSrc
      }
      startTime
      endTime
    }
  }
`

const useCreateTraining = () => {
  const [createTraining] = useMutation(CREATE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm) => {
      const trainingsQuery = { query: GET_TRAININGS, variables: { date: new Date(training.date) } }

      return createTraining({
        variables: { training },
        update: (cache, { data }) => {
          const queryData = cache.readQuery<IGetTrainingsResponse>(trainingsQuery)
          cache.writeQuery({
            ...trainingsQuery,
            data: {
              trainings: [
                ...queryData?.trainings!,
                data.insertOneTraining,
              ],
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
