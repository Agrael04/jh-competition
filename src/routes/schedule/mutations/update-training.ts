import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING } from '../queries/get-training'
import { ITrainingForm } from 'interfaces/training'

export const UPDATE_TRAINING = gql`
  mutation updateTraining ($_id: ObjectId!, $training: TrainingUpdateInput!, $date: DateTime!) {
    updateManyTrainingResources(query: { training: { _id: $_id } }, set: { date: $date }) {
      modifiedCount
      matchedCount
    }
    updateOneTraining(query: { _id: $_id }, set: $training) {
      _id
      date
      startTime
      endTime
      gym {
        _id
      }

      name
      note
      type
      traineesCount
    }
  }
`

const useUpdateTraining = () => {
  const [updateTraining] = useMutation(UPDATE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm) => {
      const trainingQuery = { query: GET_TRAINING, variables: { id: training._id } }

      return updateTraining({
        variables: { _id: training._id, date: training.date, training },
        refetchQueries: [trainingQuery],
      })
    },
    [updateTraining]
  )

  return mutate
}

export default useUpdateTraining
