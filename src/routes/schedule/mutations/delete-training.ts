import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING } from '../queries/get-training'
import { GET_TRAININGS, IGetTrainingsResponse } from '../queries/get-trainings'
import { GET_TRAINING_RESOURCE } from '../queries/get-training-resource'
import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

export const DELETE_TRAINING = gql`
  mutation deleteTraining ($_id: ObjectId!, $resources: [ObjectId], $records: [ObjectId]) {
    deleteManyTrainingResources(query: { _id_in: $resources }) {
      deletedCount
    }
    deleteManyTrainingRecords(query: { _id_in: $records }) {
      deletedCount
    }
    deleteOneTraining(query: { _id: $_id }) {
      _id
    }
  }
`

const useDeleteTraining = () => {
  const [deleteTraining] = useMutation(DELETE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm, resources: ITrainingResourceForm[], records: ITrainingRecordForm[]) => {
      const resourceIds = resources.map(r => r._id)

      return deleteTraining({
        variables: {
          _id: training._id,
          resources: resourceIds,
          records: records.map(r => r._id),
        },
        update: (client, { data }) => {
          const trainingsData = client.readQuery<IGetTrainingsResponse>({
            query: GET_TRAININGS,
            variables: {
              date: new Date(training.date),
            },
          })

          if (trainingsData) {
            client.writeQuery({
              query: GET_TRAININGS,
              variables: {
                date: new Date(training.date),
              },
              data: {
                trainings: trainingsData.trainings.filter(tr => tr._id !== data.deleteOneTraining._id),
              },
            })
          }

          resourceIds.forEach(id => {
            client.writeQuery({
              query: GET_TRAINING_RESOURCE,
              variables: {
                _id: id,
              },
              data: null,
            })
          })

          client.writeQuery({
            query: GET_TRAINING,
            variables: {
              id: training._id,
            },
            data: null,
          })
        },
      })
    },
    [deleteTraining]
  )

  return mutate
}

export default useDeleteTraining
