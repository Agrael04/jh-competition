import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCES, IGetTrainingResourcesResponse } from '../queries/get-training-resources'
import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { ITrainingForm, ITrainingResourceForm } from 'interfaces/training'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

export const CREATE_TRAINING_RESOURCE = gql`
  mutation createTrainingResource ($resource: TrainingResourceInsertInput!) {
    insertOneTrainingResource(data: $resource) {
      _id
      startTime
      endTime
      resource {
        _id
        name
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
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('trainingResources', data.insertOneTrainingResource)

          boundUpdateCachedQuery<IGetTrainingResourcesResponse>({
            query: GET_TRAINING_RESOURCES,
            variables: { date: new Date(training.date) },
            updater,
          })

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: training._id },
            updater,
          })
        },
      })
    },
    [createTrainingResource]
  )

  return mutate
}

export default useCreateTrainingResource
