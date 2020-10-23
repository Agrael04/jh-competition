import React, { useCallback } from 'react'

import { useActions, useSelector } from 'store'
import { useFormContext } from 'react-hook-form'

import Button from '@material-ui/core/Button'

import IForm from './form'

import useCreatePayment from '../../graphql/create-payment'
import useUpdatePayment from '../../graphql/update-payment'

export default function PaymentForm() {
  const actions = useActions()

  const paymentForm = useSelector(state => state.checkDialog.paymentForm)

  const { handleSubmit, errors } = useFormContext()

  const createPayment = useCreatePayment()
  const updatePayment = useUpdatePayment()

  const submit = useCallback(
    async (values: IForm) => {
      if (paymentForm._id) {
        await updatePayment(paymentForm._id, values)
      } else {
        await createPayment(values)
      }

      actions.checkDialog.closePaymentForm()
    },
    [createPayment, updatePayment, actions, paymentForm]
  )

  const disabled = Object.keys(errors).length > 0

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
