import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import GET_TRAINING from '../queries/get-training'
import ITraining from 'interfaces/training'

export const UPDATE_TRAINING = gql`
  mutation updateTraining ($_id: ObjectId!, $training: TrainingUpdateInput!) {
    updateOneTraining(query: { _id: $_id }, set: $training) {
      _id
      date
      gym
      markPrice
      moneyPrice
      name
      note
      resource
      trainer
      type
      startTime
      endTime
    }
    deleteManyTrainingRecords(query: { training: $_id }) {
      deletedCount
    }
  }
`

const useUpdateTraining = () => {
  const [updateTraining] = useMutation(UPDATE_TRAINING)

  const mutate = React.useCallback(
    (training: ITraining) => {
      const trainingQuery = { query: GET_TRAINING, variables: { id: training._id } }

      return updateTraining({
        variables: { _id: training._id, training },
        update: (cache, { data }) => {
          cache.writeQuery({
            ...trainingQuery,
            data: {
              training: data?.updateOneTraining,
              trainingRecords: [],
            },
          })
        },
      })
    },
    [updateTraining]
  )

  return mutate
}

export default useUpdateTraining
