import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../queries/get-training-resource'

import IRecordForm from 'routes/schedule/training-dialog/records-step/record-form/form'

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
  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
  }))

  const mutate = React.useCallback(
    (r: Partial<IRecordForm>) => {
      const record = ({
        ...r,
        training: { link: _id },
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
            variables: { id: _id },
            updater,
          })
        },
      })
    },
    [createTrainingRecord, _id]
  )

  return mutate
}

export default useCreateTrainingRecord
