import React from 'react'

import { useActions } from 'store'

import Button from '@material-ui/core/Button'

export default function CancelButton() {
  const actions = useActions()
  const reset = () => actions.checkDialog.resetPayment()

  return (
    <Button onClick={reset} color='primary'>
      Отменить
    </Button>
  )
}
