import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

import { useContext } from '../../context'

const UPDATE_TRAINING_RECORD = loader('./mutation.gql')

const useUpdateTrainingRecord = () => {
  const [updateTrainingRecord] = useMutation(UPDATE_TRAINING_RECORD)

  const { _id, data } = useContext(s => ({
    _id: s.state.recordForm?._id,
    data: s.state.recordForm,
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
