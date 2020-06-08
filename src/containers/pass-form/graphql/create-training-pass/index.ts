import React from 'react'
import { useSelector } from 'store'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { IUpdateCacheFn } from 'utils/apollo-cache-updater'

const CREATE_TRAINING_PASS = loader('./mutation.gql')

const useCreateTrainingPass = (update?: IUpdateCacheFn) => {
  const [createTrainingPass] = useMutation(CREATE_TRAINING_PASS)

  const { data } = useSelector(state => ({
    data: state.passForm.passForm,
  }))

  const mutate = React.useCallback(
    () => {
      if (!data) {
        return
      }

      return createTrainingPass({
        variables: { data },
        update,
      })
    },
    [createTrainingPass, data, update]
  )

  return mutate
}

export default useCreateTrainingPass
