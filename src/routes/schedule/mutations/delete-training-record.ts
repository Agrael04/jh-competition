import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse, useReadTrainingResourceById } from '../queries/get-training-resource'

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
  const readTrainingResourceById = useReadTrainingResourceById()
  const trainingId = useSelector(state => state.schedule.trainingDialog._id)
  const filters = useSelector(state => state.schedule.page.filters)

  const mutate = useCallback(
    (recordId: string, resourceId: string) => {
      const resource = readTrainingResourceById(resourceId)

      return deleteOneTrainingRecord({
        variables: { _id: recordId },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = removeUpdater('trainingRecords', data.deleteOneTrainingRecord)

          boundUpdateCachedQuery<IGetTrainingResourceResponse>({
            query: GET_TRAINING_RESOURCE,
            variables: {
              time: resource?.trainingResource?.startTime,
              resource: resource?.trainingResource?.resource._id,
              date: filters.date.toDate(),
            },
            updater,
          })

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: trainingId },
            updater,
          })
        },
      })
    },
    [deleteOneTrainingRecord, trainingId, filters, readTrainingResourceById]
  )

  return mutate
}

export default useDeleteTrainingRecord
