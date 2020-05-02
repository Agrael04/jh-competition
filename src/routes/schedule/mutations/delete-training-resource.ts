import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCES, IGetTrainingResourcesResponse } from '../queries/get-training-resources'
import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { ITrainingForm } from 'interfaces/training'

import { updateCachedQuery } from './cache-updaters'
import { removeResourceUpdater } from './cache-updaters/training-resource'

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
          const boundUpdateCachedQuery = updateCachedQuery(client)
          const updater = removeResourceUpdater(data.deleteOneTrainingResource._id)

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
    [deleteOneTrainingResource]
  )

  return mutate
}

export default useDeleteTrainingResource
