import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCES, IGetTrainingResourcesResponse } from '../queries/get-training-resources'
import { ITrainingForm } from 'interfaces/training'

import { updateCachedQuery } from './cache-updaters'
import { removeResourceUpdater } from './cache-updaters/training-resource'

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
        update: (client, { data }) => {
          const trainingQuery = { query: GET_TRAINING, variables: { id: data.deleteOneTraining._id } }
          const trainingData = client.readQuery<IGetTrainingResponse>(trainingQuery)

          const boundUpdateCachedQuery = updateCachedQuery(client)
          const updater = removeResourceUpdater(...trainingData?.trainingResources.map(r => r._id)!)

          boundUpdateCachedQuery<IGetTrainingResourcesResponse>({
            query: GET_TRAINING_RESOURCES,
            variables: { date: new Date(training.date) },
            updater,
          })
        },
      })
    },
    [deleteTraining]
  )

  return mutate
}

export default useDeleteTraining
