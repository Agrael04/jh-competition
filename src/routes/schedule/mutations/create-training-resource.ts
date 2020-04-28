import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCES, IGetTrainingResourcesResponse } from '../queries/get-training-resources'
import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { ITrainingForm, ITrainingResourceForm } from 'interfaces/training'

export const CREATE_TRAINING_RESOURCE = gql`
  mutation createTrainingResource ($resource: TrainingResourceInsertInput!) {
    insertOneTrainingResource(data: $resource) {
      _id
      startTime
      endTime
      resource {
        _id
      }
      training {
        _id
      }
      trainer {
        _id
        color
        avatarSrc
      }
    }
  }
`

const useCreateTrainingResource = () => {
  const [createTrainingResource] = useMutation(CREATE_TRAINING_RESOURCE)

  const mutate = React.useCallback(
    (training: ITrainingForm, resource: ITrainingResourceForm) => {
      return createTrainingResource({
        variables: { resource },
        update: (client, { data }) => {
          const resourcesQuery = { query: GET_TRAINING_RESOURCES, variables: { date: new Date(training.date) } }

          const resourcesData = client.readQuery<IGetTrainingResourcesResponse>(resourcesQuery)

          if (resourcesData) {
            const trainingResources = [
              ...resourcesData.trainingResources,
              data.insertOneTrainingResource,
            ]

            client.writeQuery({
              ...resourcesQuery,
              data: { ...resourcesData, trainingResources },
            })
          }

          const trainingQuery = { query: GET_TRAINING, variables: { id: training._id } }

          const trainingData = client.readQuery<IGetTrainingResponse>(trainingQuery)

          if (trainingData) {
            const trainingResources = [
              ...trainingData.trainingResources,
              data.insertOneTrainingResource,
            ]

            client.writeQuery({
              ...trainingQuery,
              data: { ...trainingData, trainingResources },
            })
          }
        },
      })
    },
    [createTrainingResource]
  )

  return mutate
}

export default useCreateTrainingResource
