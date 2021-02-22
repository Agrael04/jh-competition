import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'
import range from 'lodash/range'

import ITrainingForm from 'routes/schedule/training-dialog/training-form/form'

import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse, useReadTrainingResourceById } from '../queries/get-training-resource'

import { updateQuery } from 'utils/apollo-cache-updater'

export interface IUpdateTrainingResourceResponse {
  updateOneTrainingResource: {
    _id: string
    __typename: string
    startTime: number
    endTime: number
    resource: {
      _id: string
      __typename: string
    }
    trainer: {
      _id: string
      __typename: string
      color: number
      avatarSrc: string
      firstName: string
      lastName: string
    }
    training: {
      _id: string
      __typename: string
      type: string
      date: Date
    }
  }
}

export const UPDATE_TRAINING_RESOURCE = gql`
  mutation updateTrainingResource ($_id: ObjectId!, $resource: TrainingResourceUpdateInput!) {
    updateOneTrainingResource(query: { _id: $_id }, set: $resource) {
      _id
      startTime
      endTime
      resource {
        _id
      }
      trainer {
        _id
        color
        avatarSrc
        firstName
        lastName
      }
      training {
        _id
        type
        date
      }
    }
  }
`

const useUpdateTrainingResource = () => {
  const [updateTrainingResource] = useMutation<IUpdateTrainingResourceResponse>(UPDATE_TRAINING_RESOURCE)
  const readTrainingResourceById = useReadTrainingResourceById()
  const filters = useSelector(state => state.ui.pages.schedule.page.filters)

  const mutate = useCallback(
    (_id: string, resource: ITrainingForm) => {
      const prev = readTrainingResourceById(_id)

      return updateTrainingResource({
        variables: {
          _id,
          resource: {
            ...resource,
            trainer_unset: !resource?.trainer,
          },
        },
        update: (cache, { data }) => {
          if (prev === null || !prev.newTraining || !data) {
            return
          }

          const boundUpdateCachedQuery = updateQuery(cache)
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

          range(resource.startTime, resource.endTime).forEach(
            time => {
              if (!prev?.trainingRecords) {
                return
              }

              const trainingRecords = prev.trainingRecords

              boundUpdateCachedQuery<IGetTrainingResourceResponse>({
                query: GET_TRAINING_RESOURCE,
                variables: {
                  time,
                  resource: resource.resource.link,
                  date: filters.date.toDate(),
                },
                updater: () => ({
                  newTraining: data?.updateOneTrainingResource as any,
                  trainingRecords,
                }),
              })
            }
          )
        },
      })
    },
    [updateTrainingResource, filters, readTrainingResourceById]
  )

  return mutate
}

export default useUpdateTrainingResource
