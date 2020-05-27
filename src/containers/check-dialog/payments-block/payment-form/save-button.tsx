import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreatePayment from '../../graphql/create-payment'
import useUpdatePayment from '../../graphql/update-payment'

export default function SaveButton() {
  const actions = useActions()
  const { mode } = useSelector(state => ({
    mode: state.checkDialog.paymentMode,
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

  return (
    <Button color='primary' variant='contained' onClick={save}>
      Сохранить
    </Button>
  )
}
