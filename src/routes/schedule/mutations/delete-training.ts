import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'
import range from 'lodash/range'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'
import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../queries/get-training-resource'

import { updateQuery } from 'utils/apollo-cache-updater'

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
  const { filters, _id } = useSelector(state => ({
    filters: state.schedule.page.filters,
    _id: state.schedule.trainingDialog._id,
  }))

  const mutate = React.useCallback(
    () => {
      return deleteTraining({
        variables: {
          _id,
        },
        update: (cache, { data }) => {
          const trainingQuery = { query: GET_TRAINING, variables: { id: data.deleteOneTraining._id } }
          const trainingData = cache.readQuery<IGetTrainingResponse>(trainingQuery)

          const boundUpdateCachedQuery = updateQuery(cache)

          trainingData?.trainingResources.forEach(tr => {
            range(tr.startTime, tr.endTime).forEach(time => {
              boundUpdateCachedQuery<IGetTrainingResourceResponse>({
                query: GET_TRAINING_RESOURCE,
                variables: {
                  time,
                  resource: tr._id,
                  date: filters.date.toDate(),
                },
                updater: () => ({
                  trainingResource: null,
                  trainingRecords: [],
                }),
              })
            })
          })
        },
      })
    },
    [deleteTraining, _id, filters]
  )

  return mutate
}

export default useDeleteTraining
