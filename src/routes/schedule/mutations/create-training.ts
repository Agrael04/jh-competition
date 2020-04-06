import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAININGS, IGetTrainingsResponse } from '../queries/get-trainings'
import ITraining from 'interfaces/training'

export const CREATE_TRAINING = gql`
  mutation createTraining ($training: TrainingInsertInput!) {
    insertOneTraining(data: $training) {
      _id
      resource
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
    (training: ITraining) => {
      const trainingsQuery = { query: GET_TRAININGS, variables: { date: new Date(training.date), gym: training.gym } }
      const mappedTraining = ({ ...training, trainer: { link: training.trainer } })

      return createTraining({
        variables: { training: mappedTraining },
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
