import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCES, IGetTrainingResourcesResponse } from '../queries/get-training-resources'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

export const DELETE_TRAINING = gql`
  mutation deleteTraining ($_id: ObjectId!) {
    deleteManyTrainingResources(query: { training: { _id: $_id } }) {
      deletedCount
    }
    deleteManyTrainingRecords(query: { training: { _id: $_id } }) {
      deletedCount
    }
    deleteOneTraining(query: { _id: $_id }) {
      _id
    }
  }
`

const useDeleteTraining = () => {
  const [deleteTraining] = useMutation(DELETE_TRAINING)
  const { date, _id } = useSelector(state => ({
    date: state.schedule.page.activeDate,
    _id: state.schedule.trainingDialog._id,
  }))

  const mutate = React.useCallback(
    () => {
      return deleteTraining({
        variables: {
          _id,
        },
        update: (client, { data }) => {
          const trainingQuery = { query: GET_TRAINING, variables: { id: data.deleteOneTraining._id } }
          const trainingData = client.readQuery<IGetTrainingResponse>(trainingQuery)

          const boundUpdateCachedQuery = updateQuery(client)
          const updater = removeUpdater('trainingResources', ...trainingData?.trainingResources!)

          boundUpdateCachedQuery<IGetTrainingResourcesResponse>({
            query: GET_TRAINING_RESOURCES,
            variables: { date: new Date(date) },
            updater,
          })
        },
      })
    },
    [deleteTraining, _id, date]
  )

  return mutate
}

export default useDeleteTraining
