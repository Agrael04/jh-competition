import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

const UPDATE_PAYMENT = loader('./mutation.gql')

const useUpdatePayment = () => {
  const [updatePayment] = useMutation(UPDATE_PAYMENT)

  const { data } = useSelector(state => ({
    data: state.checkDialog.paymentForm,
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
