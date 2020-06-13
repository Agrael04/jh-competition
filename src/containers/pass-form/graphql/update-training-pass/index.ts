import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { ITrainingPassForm } from 'interfaces/training-pass'

const UPDATE_TRAINING_PASS = loader('./mutation.gql')

const useUpdateTrainingPass = () => {
  const [updateTrainingPass] = useMutation(UPDATE_TRAINING_PASS)

  const mutate = React.useCallback(
    (data: ITrainingPassForm) => {
      if (!data) {
        return
      }

      return updateTrainingPass({
        variables: { _id: data._id, data },
      })
    },
    [updateTrainingPass]
  )

  return mutate
}

export default useUpdateTrainingPass
