import React from 'react'
import { useSelector } from 'store'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const UPDATE_TRAINING_PASS = loader('./mutation.gql')

const useUpdateTrainingPass = () => {
  const [updateTrainingPass] = useMutation(UPDATE_TRAINING_PASS)

  const { data } = useSelector(state => ({
    data: state.passForm.passForm,
  }))

  const mutate = React.useCallback(
    () => {
      if (!data) {
        return
      }

      return updateTrainingPass({
        variables: { _id: data._id, data },
      })
    },
    [updateTrainingPass, data]
  )

  return mutate
}

export default useUpdateTrainingPass
