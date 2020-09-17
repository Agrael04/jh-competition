import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { IPaymentForm } from 'interfaces/payment'

const UPDATE_PAYMENT = loader('./mutation.gql')

const useUpdatePayment = () => {
  const [updatePayment] = useMutation(UPDATE_PAYMENT)

  const mutate = React.useCallback(
    (_id: string, data: Partial<IPaymentForm>) => {
      if (!data) {
        return
      }

      return updatePayment({
        variables: { _id, data },
      })
    },
    [updatePayment]
  )

  return mutate
}

export default useUpdatePayment
