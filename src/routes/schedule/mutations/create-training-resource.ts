import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'
import range from 'lodash/range'

import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../queries/get-training-resource'
import { IGetTrainingResponse, GET_TRAINING } from '../queries/get-training'

import IResourceForm from 'routes/schedule/training-dialog/resources-step/resource-form/form'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

export const CREATE_TRAINING_RESOURCE = gql`
  mutation createTrainingResource ($resource: TrainingResourceInsertInput!) {
    insertOneTrainingResource(data: $resource) {
      _id
      startTime
      endTime
      resource {
        _id
        name
      }
      training {
        _id
      }
      trainer {
        _id
        color
        avatarSrc
      }
    }
  }
`

const useCreateTrainingResource = () => {
  const [createTrainingResource] = useMutation(CREATE_TRAINING_RESOURCE)
  const filters = useSelector(state => state.schedule.page.filters)

  const mutate = useCallback(
    (trainingId: string, r: IResourceForm) => {
      const resource = ({
        ...r,
        training: { link: trainingId },
      })

      return createTrainingResource({
        variables: {
          resource,
        },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('trainingResources', data.insertOneTrainingResource)

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: trainingId },
            updater,
          })

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
                  trainingResource: data?.insertOneTrainingResource,
                  trainingRecords: [],
                }),
              })
            }
          )
        },
      })
    },
    [createTrainingResource, filters]
  )

  return mutate
}

export default useCreateTrainingResource
