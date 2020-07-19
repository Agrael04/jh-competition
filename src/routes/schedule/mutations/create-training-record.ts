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
        fullName
        balance
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

const useCreateTrainingRecord = () => {
  const [createTrainingRecord] = useMutation(CREATE_TRAINING_RECORD)

  const mutate = React.useCallback(
    (r: ITrainingRecordForm) => {
      const record = ({
        _id: r._id,
        status: r.status,
        contact: { link: r.contact.link },
        resource: { link: r.resource.link },
        training: { link: r.training.link },
        attendant: r.attendant ? { link: r.attendant.link } : null,
      })
      return createTrainingRecord({
        variables: { record },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('trainingRecords', data.insertOneTrainingRecord)

          boundUpdateCachedQuery<IGetTrainingResourceResponse>({
            query: GET_TRAINING_RESOURCE,
            variables: { id: record.resource.link },
            updater,
          })

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
