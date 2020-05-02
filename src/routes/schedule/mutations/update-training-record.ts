import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../queries/get-training-resource'
import { ITrainingRecordForm } from 'interfaces/training'

import { updateCachedQuery } from './cache-updaters'
import { addRecordUpdater, removeRecordUpdater } from './cache-updaters/training-record'

export const UPDATE_TRAINING_RECORD = gql`
  mutation updateTrainingRecord ($_id: ObjectId!, $record: TrainingRecordUpdateInput!) {
    updateOneTrainingRecord(query: { _id: $_id }, set: $record) {
      _id
      contact {
        _id
        fullName
      }
      attendant {
        _id
        fullName
      }
      training {
        _id
      }
      resource {
        _id
      }
      status
    }
  }
`

const useUpdateTrainingRecord = () => {
  const [updateTrainingRecord] = useMutation(UPDATE_TRAINING_RECORD)

  const mutate = React.useCallback(
    (rawRecord: ITrainingRecordForm, prevResource?: string) => {
      const record = ({
        ...rawRecord,
        contact: { link: rawRecord.contact.link },
        attendant: rawRecord.attendant ? { link: rawRecord.attendant.link } : null,
      })

      return updateTrainingRecord({
        variables: { _id: record._id, record },
        update: (client, { data }) => {
          if (prevResource === rawRecord.resource.link) {
            return
          }

          const boundUpdateCachedQuery = updateCachedQuery(client)
          const addUpdater = addRecordUpdater(data.updateOneTrainingRecord)
          const removeUpdater = removeRecordUpdater(data.updateOneTrainingRecord._id)

          boundUpdateCachedQuery<IGetTrainingResourceResponse>({
            query: GET_TRAINING_RESOURCE,
            variables: { id: prevResource },
            updater: removeUpdater,
          })

          boundUpdateCachedQuery<IGetTrainingResourceResponse>({
            query: GET_TRAINING_RESOURCE,
            variables: { id: record.resource.link },
            updater: addUpdater,
          })
        },
      })
    },
    [updateTrainingRecord]
  )

  return mutate
}

export default useUpdateTrainingRecord
