import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'

import { GET_TRAINING_RESOURCES, IGetTrainingResourcesResponse } from '../queries/get-training-resources'
import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

export const DELETE_TRAINING_RESOURCE = gql`
  mutation deleteTrainingResource ($_id: ObjectId!) {
    deleteOneTrainingResource(query: { _id: $_id }) {
      _id
    }
  }
`

const useDeleteTrainingResource = () => {
  const [deleteOneTrainingResource] = useMutation(DELETE_TRAINING_RESOURCE)
  const { date, _id } = useSelector(state => ({
    date: state.schedule.page.filters.date,
    _id: state.schedule.trainingDialog._id,
  }))

  const mutate = React.useCallback(
    (resourceId: string) => {
      return deleteOneTrainingResource({
        variables: { _id: resourceId },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = removeUpdater('trainingResources', data.deleteOneTrainingResource)

          boundUpdateCachedQuery<IGetTrainingResourcesResponse>({
            query: GET_TRAINING_RESOURCES,
            variables: { date: date.toDate() },
            updater,
          })

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: _id },
            updater,
          })
        },
      })
    },
    [deleteOneTrainingResource, _id, date]
  )

  return mutate
}

export default useDeleteTrainingResource
