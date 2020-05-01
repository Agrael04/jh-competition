import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCES, IGetTrainingResourcesResponse } from '../queries/get-training-resources'
import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { ITrainingForm } from 'interfaces/training'

export const DELETE_TRAINING_RESOURCE = gql`
  mutation deleteTrainingResource ($_id: ObjectId!) {
    deleteOneTrainingResource(query: { _id: $_id }) {
      _id
    }
  }
`

const useDeleteTrainingResource = () => {
  const [deleteOneTrainingResource] = useMutation(DELETE_TRAINING_RESOURCE)

  const mutate = React.useCallback(
    (training: ITrainingForm, resourceId: string) => {
      return deleteOneTrainingResource({
        variables: { _id: resourceId },
        update: (client, { data }) => {
          const resourcesQuery = { query: GET_TRAINING_RESOURCES, variables: { date: new Date(training.date) } }

          const resourcesData = client.readQuery<IGetTrainingResourcesResponse>(resourcesQuery)

          if (resourcesData) {
            const trainingResources = resourcesData.trainingResources
              .filter(tr => tr._id !== data.deleteOneTrainingResource._id)

            client.writeQuery({
              ...resourcesQuery,
              data: { ...resourcesData, trainingResources },
            })
          }

          const trainingQuery = { query: GET_TRAINING, variables: { id: training._id } }

          const trainingData = client.readQuery<IGetTrainingResponse>(trainingQuery)

          if (trainingData) {
            const trainingResources = trainingData.trainingResources
              .filter(tr => tr._id !== data.deleteOneTrainingResource._id)

            client.writeQuery({
              ...trainingQuery,
              data: { ...trainingData, trainingResources },
            })
          }
        },
      })
    },
    [deleteOneTrainingResource]
  )

  return mutate
}

export default useDeleteTrainingResource
