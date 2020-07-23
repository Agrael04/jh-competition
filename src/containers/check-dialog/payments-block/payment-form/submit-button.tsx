import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreatePayment from '../../graphql/create-payment'
import useUpdatePayment from '../../graphql/update-payment'

interface IForm {
  amount?: number | null
  type?: 'money' | 'units' | null
  pass?: {
    link: string
  }
  destination?: string
  transaction?: string
}

export default function PaymentForm() {
  const actions = useActions()
  const form = useSelector(state => state.checkDialog.paymentForm)

  const createPayment = useCreatePayment()
  const updatePayment = useUpdatePayment()

  const mutations = {
    create: createPayment,
    update: updatePayment,
  }

  const { handleSubmit, errors } = useFormContext()

  const disabled = Object.keys(errors).length > 0

  const submit = React.useCallback(
    async (payment: IForm) => {
      if (!form.mode) {
        return
      }

      await mutations[form.mode]({ ...form.payment, ...payment })

      actions.checkDialog.closePaymentForm()
    },
    [form, mutations, actions]
  )

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
