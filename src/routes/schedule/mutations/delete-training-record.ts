import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../queries/get-training-resource'

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
          const resourceQuery = { query: GET_TRAINING_RESOURCE, variables: { id: record.resource.link } }

          const resourceData = client.readQuery<IGetTrainingResourceResponse>(resourceQuery)

          if (resourceData) {
            const trainingRecords = resourceData.trainingRecords
              .filter(tr => tr._id !== data.deleteOneTrainingRecord._id)

            client.writeQuery({
              ...resourceQuery,
              data: { ...resourceData, trainingRecords },
            })
          }

          const trainingQuery = { query: GET_TRAINING, variables: { id: record.training.link } }

          const trainingData = client.readQuery<IGetTrainingResponse>(trainingQuery)

          if (trainingData) {
            const trainingRecords = trainingData.trainingRecords
              .filter(tr => tr._id !== data.deleteOneTrainingRecord._id)

            client.writeQuery({
              ...trainingQuery,
              data: { ...trainingData, trainingRecords },
            })
          }
        },
      })
    },
    [deleteOneTrainingRecord]
  )

  return mutate
}

export default useDeleteTrainingRecord
