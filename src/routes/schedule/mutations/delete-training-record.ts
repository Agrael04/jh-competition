import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { ITrainingForm, ITrainingRecordForm, ITrainingResourceForm } from 'interfaces/training'

export const DELETE_TRAINING_RECORD = gql`
  mutation deleteTrainingRecord ($trainingId: ObjectId, $trainingRecords: [ObjectId], $resourceId: ObjectId, $resourceRecords: [ObjectId], $_id: ObjectId!) {
    deleteOneTrainingRecord(query: { _id: $_id }) {
      _id
    }
    updateOneTrainingResource(query: { _id: $resourceId }, set: { records: { link: $resourceRecords } }) {
      _id
      records {
        _id
        contact {
          fullName
        }
      }
    }
    updateOneTraining(query: { _id: $trainingId }, set: { records: { link: $trainingRecords } }) {
      _id
      records {
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
  }
`

const useDeleteTrainingRecord = () => {
  const [deleteOneTrainingRecord] = useMutation(DELETE_TRAINING_RECORD)

  const mutate = React.useCallback(
    (training: ITrainingForm, resources: ITrainingResourceForm[], records: ITrainingRecordForm[], _id: string) => {
      const resource = resources.find(r => r.records.link.find(rec => rec === _id))

      return deleteOneTrainingRecord({
        variables: {
          trainingId: training._id,
          trainingRecords: records.map(r => r._id).filter(r => r !== _id),
          resourceId: resource?._id || undefined,
          resourceRecords: resource?.records.link.filter(r => r !== _id) || [],
          _id,
        },
      })
    },
    [deleteOneTrainingRecord]
  )

  return mutate
}

export default useDeleteTrainingRecord
