import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCES } from '../queries/get-training-resources'
import { ITrainingForm, ITrainingResourceForm } from 'interfaces/training'

export const UPDATE_TRAINING_RESOURCE = gql`
  mutation updateTrainingResource ($_id: ObjectId!, $resource: TrainingResourceUpdateInput!) {
    updateOneTrainingResource(query: { _id: $_id }, set: $resource) {
      _id
    }
  }
`

const useUpdateTrainingResource = () => {
  const [updateTrainingResource] = useMutation(UPDATE_TRAINING_RESOURCE)

  const mutate = React.useCallback(
    (training: ITrainingForm, resource: ITrainingResourceForm) => {
      const query = { query: GET_TRAINING_RESOURCES, variables: { date: new Date(training.date) } }

      return updateTrainingResource({
        variables: { _id: resource._id, resource },
        refetchQueries: [query],
      })
    },
    [updateTrainingResource]
  )

  return mutate
}

export default useUpdateTrainingResource
