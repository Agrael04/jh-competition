import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

import { ITrainingRecordForm } from 'interfaces/training'

const UPDATE_TRAINING_RECORD = loader('./mutation.gql')

const useUpdateTrainingRecord = () => {
  const [updateTrainingRecord] = useMutation(UPDATE_TRAINING_RECORD)

  const mutate = React.useCallback(
    (data: Partial<ITrainingRecordForm>) => {
      if (!data) {
        return
      }

      return updateTrainingRecord({
        variables: { _id: data?._id, data },
      })
    },
    [updateTrainingRecord]
  )

  return mutate
}

export default useUpdateTrainingRecord
