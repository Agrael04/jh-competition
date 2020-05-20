import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

// import useCreateTrainingPass from '../graphql/create-training-pass'

export default function SaveButton() {
  const actions = useActions()
  const { payment, mode } = useSelector(state => ({
    payment: state.checkDialog.paymentForm,
    mode: state.checkDialog.paymentMode,
  }))

  // const createTrainingPass = useCreateTrainingPass()

  const save = React.useCallback(
    async () => {
      console.log(payment, mode)
      // if (passMode === 'create') {
      //   await createTrainingPass(passForm!)
      // }

      actions.checkDialog.resetPass()
    },
    [actions, payment, mode]
  )

  return (
    <Button color='primary' variant='contained' onClick={save}>
      Сохранить
    </Button>
  )
}
