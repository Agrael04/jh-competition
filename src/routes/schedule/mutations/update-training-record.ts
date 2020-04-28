import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../queries/get-training-resource'
import { ITrainingRecordForm } from 'interfaces/training'

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

          const oldResourceQuery = { query: GET_TRAINING_RESOURCE, variables: { id: prevResource } }

          const oldResourceData = client.readQuery<IGetTrainingResourceResponse>(oldResourceQuery)

          if (oldResourceData) {
            const trainingRecords = oldResourceData.trainingRecords
              .filter(tr => tr._id !== data.updateOneTrainingRecord._id)

            client.writeQuery({
              ...oldResourceQuery,
              data: { ...oldResourceData, trainingRecords },
            })
          }

          const newResourceQuery = { query: GET_TRAINING_RESOURCE, variables: { id: record.resource.link } }

          const newResourceData = client.readQuery<IGetTrainingResourceResponse>(newResourceQuery)

          if (newResourceData) {
            const trainingRecords = [
              ...newResourceData.trainingRecords,
              data.updateOneTrainingRecord,
            ]

            client.writeQuery({
              ...newResourceQuery,
              data: { ...newResourceData, trainingRecords },
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
