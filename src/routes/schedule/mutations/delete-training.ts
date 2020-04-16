import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING } from '../queries/get-training'
import { GET_TRAINING_RESOURCES } from '../queries/get-training-resources'
import { ITrainingForm } from 'interfaces/training'

export const DELETE_TRAINING = gql`
  mutation deleteTraining ($_id: ObjectId!) {
    deleteManyTrainingResources(query: { training: { _id: $_id } }) {
      deletedCount
    }
    deleteOneTraining(query: { _id: $_id }) {
      _id
    }
    # deleteManyTrainingRecords(query: { _id: $_id }) {
    #   deletedCount
    # }
  }
`

const useDeleteTraining = () => {
  const [deleteTraining] = useMutation(DELETE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm) => {
      const trainingsQuery = { query: GET_TRAINING, variables: { id: training._id } }
      const trainingResourcesQuery = { query: GET_TRAINING_RESOURCES, variables: { date: new Date(training.date) } }

      return deleteTraining({
        variables: { _id: training._id },
        refetchQueries: [trainingsQuery, trainingResourcesQuery],
      })
    },
    [deleteTraining]
  )

  return mutate
}

export default useDeleteTraining
