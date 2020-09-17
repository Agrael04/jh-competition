import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../queries/get-training-resource'
import { ITrainingRecordForm } from 'interfaces/training'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

export const CREATE_TRAINING_RECORD = gql`
  mutation createTrainingRecord ($record: TrainingRecordInsertInput!) {
    insertOneTrainingRecord(data: $record) {
      _id
      contact {
        _id
        firstName
        lastName
        balance
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

const useCreateTrainingRecord = () => {
  const [createTrainingRecord] = useMutation(CREATE_TRAINING_RECORD)

  const mutate = React.useCallback(
    (r: Partial<ITrainingRecordForm>) => {
      const record = ({
        _id: r._id,
        training: { link: r.training!.link },
        status: r.status,
        note: r.note,
        contact: r.contact ? { link: r.contact.link } : null,
        resource: r.resource ? { link: r.resource.link } : null,
        attendant: r.attendant ? { link: r.attendant.link } : null,
      })
      return createTrainingRecord({
        variables: { record },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('trainingRecords', data.insertOneTrainingRecord)

          if (record.resource) {
            boundUpdateCachedQuery<IGetTrainingResourceResponse>({
              query: GET_TRAINING_RESOURCE,
              variables: { id: record.resource.link },
              updater,
            })
          }

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: record.training.link },
            updater,
          })
        },
      })
    },
    [createTrainingRecord]
  )

  return mutate
}

export default useCreateTrainingRecord
