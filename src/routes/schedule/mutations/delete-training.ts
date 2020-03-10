import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import GET_TRAININGS from '../queries/get-trainings'
import ITraining from 'interfaces/training'

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
    (training: ITraining) => {
      const trainingsQuery = { query: GET_TRAININGS, variables: { date: training.date }}

      return deleteTraining({
        variables: { _id: training._id },
        update: cache => {
          const queryData = cache.readQuery<any>(trainingsQuery)
          cache.writeQuery({
            ...trainingsQuery,
            data: {
              trainings: queryData?.trainings.filter((tr: any) => tr._id !== training._id),
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
