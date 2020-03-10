import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import GET_TRAINING from '../queries/get-training'
import { ITrainingRecord } from 'interfaces/training'

export const CREATE_TRAINING_RECORDS = gql`
  mutation createTrainingRecords ($records: [TrainingRecordInsertInput!]!) {
    insertManyTrainingRecords(data: $records) {
      insertedIds
    }
  }
`

const useCreateTrainingRecords = () => {
  const [createTrainingRecords] = useMutation(CREATE_TRAINING_RECORDS)

  const mutate = React.useCallback(
    (trainingId: string, records: ITrainingRecord[]) => {
      const trainingQuery = { query: GET_TRAINING, variables: { id: trainingId }}
      const mappedRecords = records.map(r => ({ ...r, trainee: { link: r.trainee._id } }))

      return createTrainingRecords({
        variables: { records: mappedRecords },
        update: cache => {
          const queryData = cache.readQuery<any>(trainingQuery)
          cache.writeQuery({
            ...trainingQuery,
            data: {
              training: queryData.training,
              trainingRecords: records.map(r => ({ ...r, __typename: 'TrainingRecord' })),
            },
          })
        },
      })
    },
    [createTrainingRecords]
  )

  return mutate
}

export default useCreateTrainingRecords
