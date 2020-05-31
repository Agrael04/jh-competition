import React from 'react'
import { useSelector } from 'store'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

const UPDATE_TRAINING_RECORD = loader('./mutation.gql')

const useUpdateTrainingRecord = () => {
  const [updateTrainingRecord] = useMutation(UPDATE_TRAINING_RECORD)

  const { _id, data } = useSelector(state => ({
    _id: state.checkDialog.recordForm?._id,
    data: state.checkDialog.recordForm,
  }))

  const mutate = React.useCallback(
    () => {
      return updateTrainingRecord({
        variables: { _id, data },
      })
    },
    [updateTrainingRecord, _id, data]
  )

  return mutate
}

export default useUpdateTrainingRecord
