import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse, useReadTrainingResourceById } from '../queries/get-training-resource'

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
  const readTrainingResourceById = useReadTrainingResourceById()
  const filters = useSelector(state => state.ui.pages.schedule.page.filters)
  const trainingId = useSelector(state => state.ui.pages.schedule.trainingDialog._id)

  const mutate = useCallback(
    (r: Partial<IRecordForm>) => {
      if (!trainingId) {
        return
      }

      const training = readTrainingResourceById(trainingId)
      const record = ({
        ...r,
        training: { link: trainingId },
      })

      return createTrainingRecord({
        variables: { record },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('trainingRecords', data.insertOneTrainingRecord)

          boundUpdateCachedQuery<IGetTrainingResourceResponse>({
            query: GET_TRAINING_RESOURCE,
            variables: {
              time: training?.newTraining?.startTime,
              resource: training?.newTraining?.resource._id,
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
    [createTrainingRecord, trainingId, filters, readTrainingResourceById]
  )

  return mutate
}

export default useCreateTrainingRecord
