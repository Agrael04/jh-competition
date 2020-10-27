import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import ITrainingForm from 'routes/schedule/training-dialog/training-step/training-form/form'

export const CREATE_TRAINING = gql`
  mutation createTraining ($training: TrainingInsertInput!) {
    insertOneTraining(data: $training) {
      _id
    }
  }
`

interface IMutationResponse {
  insertOneTraining: {
    _id: string
  }
}

const useCreateTraining = () => {
  const [createTraining] = useMutation<IMutationResponse>(CREATE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm) => {
      return createTraining({
        variables: {
          training,
        },
      })
    },
    [createTraining]
  )

  return mutate
}

export default useCreateTraining
