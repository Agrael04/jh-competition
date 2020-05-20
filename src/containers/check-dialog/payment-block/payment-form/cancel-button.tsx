import React from 'react'
import { useActions } from 'store'

import Button from '@material-ui/core/Button'

export default function CancelButton() {
  const actions = useActions()
  const cancel = actions.checkDialog.resetPayment

  return (
    <Button onClick={cancel} color='primary'>
      Отменить
    </Button>
  )
}
