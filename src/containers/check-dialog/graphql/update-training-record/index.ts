import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

import { useSelector } from 'store'

const UPDATE_TRAINING_RECORD = loader('./mutation.gql')

const useUpdateTrainingRecord = () => {
  const [updateTrainingRecord] = useMutation(UPDATE_TRAINING_RECORD)

  const { data } = useSelector(state => ({
    data: state.checkDialog.recordForm,
  }))

  const mutate = React.useCallback(
    () => {
      if (!data) {
        return
      }

      return updateTrainingRecord({
        variables: { _id: data?._id, data },
      })
    },
    [updateTrainingRecord, data]
  )

  return mutate
}

export default useUpdateTrainingRecord
