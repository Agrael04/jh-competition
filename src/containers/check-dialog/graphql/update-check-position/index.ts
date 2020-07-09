import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

import { useSelector } from 'store'

const UPDATE_CHECK_POSITION = loader('./mutation.gql')

const useUpdateTrainingRecord = () => {
  const [updateCheckPosition] = useMutation(UPDATE_CHECK_POSITION)

  const { data } = useSelector(state => ({
    data: state.checkDialog.positionForm,
  }))

  const mutate = React.useCallback(
    () => {
      if (!data) {
        return
      }

      return updateCheckPosition({
        variables: { _id: data?._id, data },
      })
    },
    [updateCheckPosition, data]
  )

  return mutate
}

export default useUpdateTrainingRecord
