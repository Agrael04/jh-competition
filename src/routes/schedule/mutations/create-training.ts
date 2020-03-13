import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import GET_TRAININGS from '../queries/get-trainings'
import ITraining from 'interfaces/training'

export const CREATE_TRAINING = gql`
  mutation createTraining ($training: TrainingInsertInput!) {
    insertOneTraining(data: $training) {
      _id
      time
      resource
      trainer
    }
  }
`

const useCreateTraining = () => {
  const [createTraining] = useMutation(CREATE_TRAINING)

  const mutate = React.useCallback(
    (training: ITraining) => {
      const trainingsQuery = { query: GET_TRAININGS, variables: { date: new Date(training.date) }}

      return createTraining({
        variables: { training },
        update: (cache, { data }) => {
          const queryData = cache.readQuery<any>(trainingsQuery)
          cache.writeQuery({
            ...trainingsQuery,
            data: {
              trainings: [
                ...queryData.trainings,
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
