import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING } from '../queries/get-training'
import { GET_TRAINING_RESOURCES } from '../queries/get-training-resources'
import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

export const CREATE_TRAINING = gql`
  mutation createTraining ($training: TrainingInsertInput!, $resources: [TrainingResourceInsertInput!]!) {
    insertOneTraining(data: $training) {
      _id
      date
      startTime
      endTime
      gym {
        _id
      }
      name
      type
      traineesCount
      note
    }
    insertManyTrainingResources(data: $resources) {
      insertedIds
    }
  }
`

export const CREATE_TRAINING_WITH_RECORDS = gql`
  mutation createTraining ($training: TrainingInsertInput!, $resources: [TrainingResourceInsertInput!]!, $records: [TrainingRecordInsertInput!]!) {
    insertOneTraining(data: $training) {
      _id
      date
      startTime
      endTime
      gym {
        _id
      }
      name
      type
      traineesCount
      note
    }
    insertManyTrainingResources(data: $resources) {
      insertedIds
    }
    insertManyTrainingRecords(data: $records) {
      insertedIds
    }
  }
`

const useCreateTraining = () => {
  const [createTraining] = useMutation(CREATE_TRAINING)
  const [createTrainingWithRecords] = useMutation(CREATE_TRAINING_WITH_RECORDS)

  const mutate = React.useCallback(
    (training: ITrainingForm, resources: ITrainingResourceForm[], rawRecords: ITrainingRecordForm[]) => {
      const records = rawRecords.map(r => ({
        _id: r._id,
        status: r.status,
        contact: { link: r.contact.link },
        training: { link: r.training.link },
        resource: { link: r.resource.link },
        attendant: r.attendant ? { link: r.attendant.link } : null,
      }))

      if (records.length > 0) {
        return createTrainingWithRecords({
          variables: { training, resources, records },
          refetchQueries: [{ query: GET_TRAINING_RESOURCES, variables: { date: new Date(training.date) } }],
          update: (client, { data }) => {
            const trainingQuery = { query: GET_TRAINING, variables: { id: data.deleteOneTraining._id } }

            client.writeQuery({
              ...trainingQuery,
              data: {
                training,
                trainingRecords: records,
                trainingResources: resources,
              },
            })
          },
        })
      }

      return createTraining({
        variables: { training, resources },
        refetchQueries: [{ query: GET_TRAINING_RESOURCES, variables: { date: new Date(training.date) } }],
        update: (client, { data }) => {
          const trainingQuery = { query: GET_TRAINING, variables: { id: data.deleteOneTraining._id } }

          client.writeQuery({
            ...trainingQuery,
            data: {
              training,
              trainingRecords: records,
              trainingResources: resources,
            },
          })
        },
      })
    },
    [createTraining, createTrainingWithRecords]
  )

  return mutate
}

export default useCreateTraining
