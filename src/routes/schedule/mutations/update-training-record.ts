import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../queries/get-training-resource'
import { ITrainingRecordForm } from 'interfaces/training'

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

  const mutate = React.useCallback(
    (rawRecord: Partial<ITrainingRecordForm>, prevResource?: string) => {
      const record = ({
        ...rawRecord,
        contact: rawRecord.contact ? { link: rawRecord.contact.link } : null,
        attendant: rawRecord.attendant ? { link: rawRecord.attendant.link } : null,
      })

      return updateTrainingRecord({
        variables: { _id: record._id, record },
        update: (client, { data }) => {
          if (prevResource === rawRecord.resource?.link) {
            return
          }

          const boundUpdateCachedQuery = updateQuery(client)
          const boundCreateUpdate = createUpdater('trainingRecords', data.updateOneTrainingRecord)
          const boundRemoveUpdater = removeUpdater('trainingRecords', data.updateOneTrainingRecord)

          boundUpdateCachedQuery<IGetTrainingResourceResponse>({
            query: GET_TRAINING_RESOURCE,
            variables: { id: prevResource },
            updater: boundRemoveUpdater,
          })

          if (record.resource) {
            boundUpdateCachedQuery<IGetTrainingResourceResponse>({
              query: GET_TRAINING_RESOURCE,
              variables: { id: record.resource.link },
              updater: boundCreateUpdate,
            })
          }
        },
      })
    },
    [updateTrainingRecord]
  )

  return mutate
}

export default useUpdateTrainingRecord
