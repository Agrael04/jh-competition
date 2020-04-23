import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

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
    (rawRecord: ITrainingRecordForm) => {
      const record = ({
        ...rawRecord,
        contact: { link: rawRecord.contact.link },
        attendant: rawRecord.attendant ? { link: rawRecord.attendant.link } : null,
      })

      return updateTrainingRecord({
        variables: { _id: record._id, record },
      })
    },
    [updateTrainingRecord]
  )

  return mutate
}

export default useUpdateTrainingRecord
