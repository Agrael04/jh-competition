import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCES, IGetTrainingResourcesResponse } from '../queries/get-training-resources'
import { GET_TRAINING_RESOURCE } from '../queries/get-training-resource'
import { ITrainingForm } from 'interfaces/training'

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

          client.writeQuery({
            ...trainingQuery,
            data: {
              training: null,
              trainingRecords: [],
              trainingResources: [],
            },
          })

          const resourcesQuery = { query: GET_TRAINING_RESOURCES, variables: { date: new Date(training.date) } }

          const resourcesData = client.readQuery<IGetTrainingResourcesResponse>(resourcesQuery)

          if (resourcesData) {
            const trainingResources = resourcesData.trainingResources
              .filter(tr => !trainingData?.trainingResources.find(r => r._id === tr._id))

            client.writeQuery({
              ...resourcesQuery,
              data: { ...resourcesData, trainingResources },
            })
          }

          trainingData?.trainingResources.forEach(resource => {
            const resourceQuery = { query: GET_TRAINING_RESOURCE, variables: { id: resource._id } }

            client.writeQuery({
              ...resourceQuery,
              data: {
                trainingRecords: [],
                trainingResource: null,
              },
            })
          })
        },
      })
    },
    [deleteTraining]
  )

  return mutate
}

export default useDeleteTraining
