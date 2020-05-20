import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../queries/get-training-resource'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

export const DELETE_TRAINING_RECORD = gql`
  mutation deleteTrainingRecord ($_id: ObjectId!) {
    deleteOneTrainingRecord(query: { _id: $_id }) {
      _id
    }
  }
`

const useDeleteTrainingRecord = () => {
  const [deleteOneTrainingRecord] = useMutation(DELETE_TRAINING_RECORD)

  const mutate = React.useCallback(
    (record: any) => {
      return deleteOneTrainingRecord({
        variables: { _id: record._id },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = removeUpdater('trainingRecords', data.deleteOneTrainingRecord._id)

          boundUpdateCachedQuery<IGetTrainingResourceResponse>({
            query: GET_TRAINING_RESOURCE,
            variables: { id: record.resource._id },
            updater,
          })

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: record.training._id },
            updater,
          })
        },
      })
    },
    [deleteOneTrainingRecord]
  )

  return mutate
}

export default useDeleteTrainingRecord
