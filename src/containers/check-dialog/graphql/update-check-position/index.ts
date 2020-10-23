import { useCallback } from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

import IPositionForm from '../../positions-block/position-form/form'

const UPDATE_CHECK_POSITION = loader('./mutation.gql')

const useUpdateCheckPosition = () => {
  const [mutation] = useMutation(UPDATE_CHECK_POSITION)

  const mutate = useCallback(
    (_id: string, data: Partial<IPositionForm>) => {
      return mutation({
        variables: { _id, data },
      })
    },
    [mutation]
  )

  return mutate
}

export default useUpdateCheckPosition
