import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreatePayment from '../../graphql/create-payment'
import useUpdatePayment from '../../graphql/update-payment'

export default function SaveButton() {
  const actions = useActions()
  const { mode, payment } = useSelector(state => ({
    mode: state.checkDialog.paymentMode,
    payment: state.checkDialog.paymentForm,
  }))

  const createPayment = useCreatePayment()
  const updatePayment = useUpdatePayment()

  const save = React.useCallback(
    async () => {
      if (mode === 'create') {
        await createPayment()
      }

      if (mode === 'update') {
        await updatePayment()
      }

      actions.checkDialog.resetPayment()
    },
    [actions, createPayment, updatePayment, mode]
  )

  const disabled = React.useMemo(
    () => {
      if (!payment) {
        return true
      }

      if (!payment.amount) {
        return true
      }

      if (payment.isDebt) {
        return false
      }

      if (payment.type === 'units' && !payment.pass) {
        return true
      }

      if (payment.type === 'money' && !payment.transaction) {
        return true
      }

      if (payment.type === 'money' && !payment.destination) {
        return true
      }

      return false
    }, [payment]
  )

  return (
    <Button color='primary' variant='contained' onClick={save} disabled={disabled}>
      Сохранить
    </Button>
  )
}
