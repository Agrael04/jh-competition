import React from 'react'
import { useSelector } from 'store'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

const UPDATE_CHECK_POSITION = loader('./mutation.gql')

const useUpdateTrainingRecord = () => {
  const [updateCheckPosition] = useMutation(UPDATE_CHECK_POSITION)

  const { _id, data } = useSelector(state => ({
    _id: state.checkDialog.positionForm?._id,
    data: state.checkDialog.positionForm,
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
