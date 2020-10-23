import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import IPaymentForm from '../../payments-block/payment-form/form'

const UPDATE_PAYMENT = loader('./mutation.gql')

const useUpdatePayment = () => {
  const [mutation] = useMutation(UPDATE_PAYMENT)

  const mutate = useCallback(
    (_id: string, data: Partial<IPaymentForm>) => {
      return mutation({
        variables: { _id, data },
      })
    },
    [mutation]
  )

  return mutate
}

export default useUpdatePayment
