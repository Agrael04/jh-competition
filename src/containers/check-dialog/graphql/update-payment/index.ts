import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useContext } from '../../context'

const UPDATE_PAYMENT = loader('./mutation.gql')

const useUpdatePayment = () => {
  const [updatePayment] = useMutation(UPDATE_PAYMENT)

  const { data } = useContext(s => ({
    data: s.state.paymentForm,
  }))

  const mutate = React.useCallback(
    () => {
      if (!data) {
        return
      }

      return updatePayment({
        variables: { _id: data._id, data },
      })
    },
    [updatePayment, data]
  )

  return mutate
}

export default useUpdatePayment
