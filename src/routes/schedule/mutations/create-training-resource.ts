import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'

import { GET_TRAINING_RESOURCES, IGetTrainingResourcesResponse } from '../queries/get-training-resources'
import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'

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
  const { date, gym, resources, _id } = useSelector(state => ({
    date: state.schedule.page.filters.date,
    gym: state.schedule.page.filters.gym,
    resources: state.schedule.page.filters.resources,
    _id: state.schedule.trainingDialog._id,
  }))

  const mutate = React.useCallback(
    (r: IResourceForm) => {
      const resource = ({
        ...r,
        training: { link: _id },
      })

      return createTrainingResource({
        variables: {
          resource,
        },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('trainingResources', data.insertOneTrainingResource)

          boundUpdateCachedQuery<IGetTrainingResourcesResponse>({
            query: GET_TRAINING_RESOURCES,
            variables: {
              date: date.toDate(),
              gym,
              resources,
            },
            updater,
          })

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: _id },
            updater,
          })
        },
      })
    },
    [createTrainingResource, _id, date, gym, resources]
  )

  return mutate
}

export default useCreateTrainingResource
