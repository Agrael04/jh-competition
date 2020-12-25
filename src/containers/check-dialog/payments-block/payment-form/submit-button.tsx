import { useCallback } from 'react'

import { useDispatch, useSelector } from 'store'
import { useFormContext } from 'react-hook-form'

import Button from '@material-ui/core/Button'

import { closePaymentForm } from 'store/ui/dialogs/check-dialog/actions'

import IForm from './form'

import useCreatePayment from '../../graphql/create-payment'
import useUpdatePayment from '../../graphql/update-payment'

export default function PaymentForm() {
  const dispatch = useDispatch()

  const paymentForm = useSelector(state => state.ui.dialogs.checkDialog.paymentForm)

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

      dispatch(closePaymentForm())
    },
    [createPayment, updatePayment, paymentForm]
  )

  const disabled = Object.keys(errors).length > 0

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
