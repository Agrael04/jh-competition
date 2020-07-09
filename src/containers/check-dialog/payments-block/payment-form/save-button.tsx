import React from 'react'

import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreatePayment from '../../graphql/create-payment'
import useUpdatePayment from '../../graphql/update-payment'

export default function SaveButton() {
  const { mode, form } = useSelector(state => ({
    mode: state.checkDialog.paymentMode,
    form: state.checkDialog.paymentForm,
  }))
  const actions = useActions()
  const reset = actions.checkDialog.resetPayment

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

      reset()
    },
    [reset, createPayment, updatePayment, mode]
  )

  const disabled = React.useMemo(
    () => {
      if (!form) {
        return true
      }

      if (!form.amount) {
        return true
      }

      if (form.type === 'units' && !form.pass) {
        return true
      }

      if (form.type === 'money' && !form.transaction) {
        return true
      }

      if (form.type === 'money' && !form.destination) {
        return true
      }

      return false
    }, [form]
  )

  return (
    <Button color='primary' variant='contained' onClick={save} disabled={disabled}>
      Сохранить
    </Button>
  )
}
