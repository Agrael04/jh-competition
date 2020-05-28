import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTrainingPass from '../graphql/create-training-pass'

export default function SaveButton() {
  const actions = useActions()
  const { passMode, pass } = useSelector(state => ({
    passMode: state.checkDialog.passMode,
    pass: state.checkDialog.passForm,
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

  const disabled = React.useMemo(
    () => {
      return (
        !pass ||
        !pass.type ||
        !pass.size ||
        !pass.capacity ||
        !pass.duration ||
        !pass.activation ||
        !pass.createdAt ||
        !pass.contact
      )
    }, [pass]
  )

  return (
    <Button color='primary' variant='contained' onClick={save} disabled={disabled}>
      Сохранить
    </Button>
  )
}
