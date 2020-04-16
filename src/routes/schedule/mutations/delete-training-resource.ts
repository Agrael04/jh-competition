import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING_RESOURCES } from '../queries/get-training-resources'

export const DELETE_TRAINING_RESOURCE = gql`
  mutation deleteTrainingResource ($_id: ObjectId!) {
    deleteOneTrainingResource(query: { _id: $_id }) {
      _id
    }
  }
`

const useDeleteTrainingResource = () => {
  const [deleteOneTrainingResource] = useMutation(DELETE_TRAINING_RESOURCE)

  const mutate = React.useCallback(
    (date: Date, _id: string) => {
      const query = { query: GET_TRAINING_RESOURCES, variables: { date: new Date(date) } }

      return deleteOneTrainingResource({
        variables: { _id },
        refetchQueries: [query],
      })
    },
    [deleteOneTrainingResource]
  )

  return mutate
}

export default useDeleteTrainingResource
