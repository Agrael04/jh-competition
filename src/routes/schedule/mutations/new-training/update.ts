import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'
import range from 'lodash/range'

import IResourceForm from 'routes/schedule/training-dialog/training-form/form'

import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse, useReadTrainingResourceById } from '../../queries/get-training-resource'

import { updateQuery } from 'utils/apollo-cache-updater'

export const UPDATE_TRAINING_RESOURCE = gql`
  mutation updateTraining ($_id: ObjectId!, $resource: NewTrainingUpdateInput!) {
    updateOneNewTraining(query: { _id: $_id }, set: $resource) {
      _id
      type
      name
      note
      date
      startTime
      endTime
      resource {
        _id
      }
      gym {
        _id
      }
      trainer {
        _id
        color
        avatarSrc
        firstName
        lastName
      }
    }
  }
`

export interface IUpdateTrainingResourceResponse {
  updateOneNewTraining: {
    _id: string
    __typename: string
    type: string
    name: string
    note: string
    date: Date
    startTime: number
    endTime: number
    gym: {
      _id: string
      __typename: string
    }
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
  }
}

const useUpdateTrainingResource = () => {
  const [mutation] = useMutation<IUpdateTrainingResourceResponse>(UPDATE_TRAINING_RESOURCE)
  const readTrainingResourceById = useReadTrainingResourceById()
  const filters = useSelector(state => state.ui.pages.schedule.page.filters)

  const mutate = useCallback(
    (_id: string, resource: IResourceForm) => {
      const prev = readTrainingResourceById(_id)

      return mutation({
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
              boundUpdateCachedQuery<IGetTrainingResourceResponse>({
                query: GET_TRAINING_RESOURCE,
                variables: {
                  time,
                  resource: resource.resource.link,
                  date: filters.date.toDate(),
                },
                updater: () => ({
                  newTraining: data.updateOneNewTraining,
                  trainingRecords: prev.trainingRecords || [],
                }),
              })
            }
          )
        },
      })
    },
    [mutation, filters, readTrainingResourceById]
  )

  return mutate
}

export default useUpdateTrainingResource
