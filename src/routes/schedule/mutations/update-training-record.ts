import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'

import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse, useReadTrainingResourceById } from '../queries/get-training-resource'

import IRecordForm from 'routes/schedule/training-dialog/records-step/record-form/form'
import { updateQuery, createUpdater, removeUpdater } from 'utils/apollo-cache-updater'

export const UPDATE_TRAINING_RECORD = gql`
  mutation updateTrainingRecord ($_id: ObjectId!, $record: TrainingRecordUpdateInput!) {
    updateOneTrainingRecord(query: { _id: $_id }, set: $record) {
      _id
      contact {
        _id
          firstName
          lastName
      }
      attendant {
        _id
          firstName
          lastName
      }
      training {
        _id
      }
      resource {
        _id
      }
      note
      status
    }
  }
`

const useUpdateTrainingRecord = () => {
  const [updateTrainingRecord] = useMutation(UPDATE_TRAINING_RECORD)
  const readTrainingResourceById = useReadTrainingResourceById()
  const filters = useSelector(state => state.schedule.page.filters)

  const mutate = React.useCallback(
    (_id: string, record: Partial<IRecordForm>, resourceId: string) => {
      return updateTrainingRecord({
        variables: {
          _id,
          record,
        },
        update: (client, { data }) => {
          if (!record.resource || resourceId === record.resource?.link) {
            return
          }

          const prev = readTrainingResourceById(resourceId)
          const curr = readTrainingResourceById(record.resource?.link)

          const boundUpdateCachedQuery = updateQuery(client)
          const boundCreateUpdate = createUpdater('trainingRecords', data.updateOneTrainingRecord)
          const boundRemoveUpdater = removeUpdater('trainingRecords', data.updateOneTrainingRecord)

          boundUpdateCachedQuery<IGetTrainingResourceResponse>({
            query: GET_TRAINING_RESOURCE,
            variables: {
              time: prev?.trainingResource?.startTime,
              resource:  prev?.trainingResource?.resource._id,
              date: filters.date.toDate(),
            },
            updater: boundRemoveUpdater,
          })

          boundUpdateCachedQuery<IGetTrainingResourceResponse>({
            query: GET_TRAINING_RESOURCE,
            variables: {
              time: curr?.trainingResource?.startTime,
              resource: curr?.trainingResource?.resource._id,
              date: filters.date.toDate(),
            },
            updater: boundCreateUpdate,
          })
        },
      })
    },
    [updateTrainingRecord, filters, readTrainingResourceById]
  )

  return mutate
}

export default useUpdateTrainingRecord
