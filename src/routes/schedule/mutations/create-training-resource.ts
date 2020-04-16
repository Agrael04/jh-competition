import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCES } from '../queries/get-training-resources'
import { ITrainingForm, ITrainingResourceForm } from 'interfaces/training'

export const CREATE_TRAINING_RESOURCE = gql`
  mutation createTrainingResource ($resource: TrainingResourceInsertInput!) {
    insertOneTrainingResource(data: $resource) {
      _id
    }
  }
`

const useCreateTrainingResource = () => {
  const [createTrainingResource] = useMutation(CREATE_TRAINING_RESOURCE)

  const mutate = React.useCallback(
    (training: ITrainingForm, rawResource: ITrainingResourceForm) => {
      const resource = ({
        ...rawResource,
        date: training.date,
        training: { link: training._id },
      })
      const query = { query: GET_TRAINING_RESOURCES, variables: { date: new Date(training.date) } }

      return createTrainingResource({
        variables: { resource },
        refetchQueries: [query],
      })
    },
    [createTrainingResource]
  )

  return mutate
}

export default useCreateTrainingResource
