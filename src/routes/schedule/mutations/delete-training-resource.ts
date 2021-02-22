import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'
import range from 'lodash/range'

import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse, useReadTrainingResourceById } from '../queries/get-training-resource'
import { IGetTrainingResponse, GET_TRAINING } from '../queries/get-training'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

export const DELETE_TRAINING_RESOURCE = gql`
  mutation deleteTrainingResource ($_id: ObjectId!) {
    deleteOneTrainingResource(query: { _id: $_id }) {
      _id
    }
  }
`

const useDeleteTrainingResource = () => {
  const [deleteOneTrainingResource] = useMutation(DELETE_TRAINING_RESOURCE)
  const readTrainingResourceById = useReadTrainingResourceById()
  const trainingId = useSelector(state => state.ui.pages.schedule.trainingDialog._id)
  const filters = useSelector(state => state.ui.pages.schedule.page.filters)

  const mutate = useCallback(
    (_id: string) => {
      const prev = readTrainingResourceById(_id)

      return deleteOneTrainingResource({
        variables: { _id },
        update: (cache, { data }) => {
          const boundUpdateCachedQuery = updateQuery(cache)
          const updater = removeUpdater('trainingResources', data.deleteOneTrainingResource)

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: trainingId },
            updater,
          })

          if (prev === null || !prev.newTraining || !data) {
            return
          }

          range(prev.newTraining.startTime, prev.newTraining.endTime).forEach(
            time => {
              if (!prev?.newTraining) {
                return
              }

              const resource = prev.newTraining.resource._id

              boundUpdateCachedQuery<IGetTrainingResourceResponse>({
                query: GET_TRAINING_RESOURCE,
                variables: {
                  time,
                  resource,
                  date: filters.date.toDate(),
                },
                updater: () => ({
                  newTraining: null,
                  trainingRecords: [],
                }),
              })
            }
          )
        },
      })
    },
    [deleteOneTrainingResource, trainingId, readTrainingResourceById, filters]
  )

  return mutate
}

export default useDeleteTrainingResource
