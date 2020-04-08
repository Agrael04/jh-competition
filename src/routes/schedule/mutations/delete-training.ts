import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAININGS, IGetTrainingsResponse } from '../queries/get-trainings'
import { ITrainingForm } from 'interfaces/training'

export const DELETE_TRAINING = gql`
  mutation deleteTraining ($_id: ObjectId!) {
    deleteOneTraining(query: { _id: $_id }) {
      _id
    }
    deleteManyTrainingRecords(query: { _id: $_id }) {
      deletedCount
    }
  }
`

const useDeleteTraining = () => {
  const [deleteTraining] = useMutation(DELETE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm) => {
      const trainingsQuery = { query: GET_TRAININGS, variables: { date: new Date(training.date) } }

      return deleteTraining({
        variables: { _id: training._id },
        update: (cache, { data }) => {
          const queryData = cache.readQuery<IGetTrainingsResponse>(trainingsQuery)
          cache.writeQuery({
            ...trainingsQuery,
            data: {
              trainings: queryData?.trainings.filter(tr => tr._id !== data.deleteOneTraining._id),
            },
          })
        },
      })
    },
    [deleteTraining]
  )

  return mutate
}

export default useDeleteTraining
