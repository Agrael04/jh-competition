import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { IUpdateCacheFn } from 'utils/apollo-cache-updater'

import { ITrainingPassForm } from 'interfaces/training-pass'

const CREATE_TRAINING_PASS = loader('./mutation.gql')

const useCreateTrainingPass = (update?: IUpdateCacheFn) => {
  const [createTrainingPass] = useMutation(CREATE_TRAINING_PASS)

  const mutate = useCallback(
    (data: ITrainingPassForm) => {
      if (!data) {
        return
      }

      return createTrainingPass({
        variables: { data },
        update,
      })
    },
    [createTrainingPass, update]
  )

  return mutate
}

export default useCreateTrainingPass
