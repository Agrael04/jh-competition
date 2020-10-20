import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import IResourceForm from 'routes/schedule/training-dialog/resources-step/resource-form/form'

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
      }
      records {
        _id
      }
    }
  }
`

const useUpdateTrainingResource = () => {
  const [updateTrainingResource] = useMutation(UPDATE_TRAINING_RESOURCE)

  const mutate = React.useCallback(
    (_id: string, resource: IResourceForm) => {
      return updateTrainingResource({
        variables: {
          _id,
          resource: {
            ...resource,
            trainer_unset: !resource?.trainer,
          },
        },
      })
    },
    [updateTrainingResource]
  )

  return mutate
}

export default useUpdateTrainingResource
