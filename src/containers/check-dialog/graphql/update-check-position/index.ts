import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

import { useContext } from '../../context'

const UPDATE_CHECK_POSITION = loader('./mutation.gql')

const useUpdateTrainingRecord = () => {
  const [updateCheckPosition] = useMutation(UPDATE_CHECK_POSITION)

  const { _id, data } = useContext(s => ({
    data: s.state?.positionForm,
    _id: s.state?.positionForm?._id,
  }))

  const mutate = React.useCallback(
    () => {
      return updateCheckPosition({
        variables: { _id, data },
      })
    },
    [updateCheckPosition, _id, data]
  )

  return mutate
}

export default useUpdateTrainingRecord
