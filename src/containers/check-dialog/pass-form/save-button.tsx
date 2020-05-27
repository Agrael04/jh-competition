import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTrainingPass from '../graphql/create-training-pass'

export default function SaveButton() {
  const actions = useActions()
  const { passMode } = useSelector(state => ({
    passMode: state.checkDialog.passMode,
  }))

  const createTrainingPass = useCreateTrainingPass()

  const save = React.useCallback(
    async () => {
      if (passMode === 'create') {
        await createTrainingPass()
      }

      actions.checkDialog.resetPass()
    },
    [actions, createTrainingPass, passMode]
  )

  return (
    <Button color='primary' variant='contained' onClick={save}>
      Сохранить
    </Button>
  )
}
