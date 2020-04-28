import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING } from '../queries/get-training'
import { GET_TRAININGS, IGetTrainingsResponse } from '../queries/get-trainings'
import { GET_TRAINING_RESOURCE } from '../queries/get-training-resource'
import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

export const DELETE_TRAINING = gql`
  mutation deleteTraining ($_id: ObjectId!) {
    deleteManyTrainingResources(query: { training: { _id: $_id } }) {
      deletedCount
    }
    deleteManyTrainingRecords(query: { training: { _id: $_id } }) {
      deletedCount
    }
    deleteOneTraining(query: { _id: $_id }) {
      _id
    }
  }
`

const useDeleteTraining = () => {
  const [deleteTraining] = useMutation(DELETE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm) => {
      return deleteTraining({
        variables: {
          _id: training._id,
        },
      })
    },
    [deleteTraining]
  )

  return mutate
}

export default useDeleteTraining
