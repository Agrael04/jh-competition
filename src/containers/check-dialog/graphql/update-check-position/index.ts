import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

import { ICheckPositionForm } from 'interfaces/check-position'

const UPDATE_CHECK_POSITION = loader('./mutation.gql')

const useUpdateTrainingRecord = () => {
  const [updateCheckPosition] = useMutation(UPDATE_CHECK_POSITION)

  const mutate = React.useCallback(
    (data: Partial<ICheckPositionForm>) => {
      if (!data) {
        return
      }

      return updateCheckPosition({
        variables: { _id: data?._id, data },
      })
    },
    [updateCheckPosition]
  )

  return mutate
}

export default useUpdateTrainingRecord
