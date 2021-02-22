import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'

import { useReadTrainingResourceById } from '../queries/get-training-resource'

import IRecordForm from 'routes/schedule/training-dialog/records-step/record-form/form'

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
  const filters = useSelector(state => state.ui.pages.schedule.page.filters)

  const mutate = useCallback(
    (_id: string, record: Partial<IRecordForm>) => {
      return updateTrainingRecord({
        variables: {
          _id,
          record,
        },
      })
    },
    [updateTrainingRecord, filters, readTrainingResourceById]
  )

  return mutate
}

export default useUpdateTrainingRecord
