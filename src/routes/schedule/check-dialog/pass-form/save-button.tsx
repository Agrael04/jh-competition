import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTrainingPass from '../../mutations/create-training-pass'

export default function ResourcesBlock() {
  const actions = useActions()
  const { passMode, passForm } = useSelector(state => ({
    passForm: state.schedule.checkDialog.passForm,
    passMode: state.schedule.checkDialog.passMode,
  }))

  const createTrainingPass = useCreateTrainingPass()

  const save = React.useCallback(
    async () => {
      if (passMode === 'create') {
        await createTrainingPass(passForm!)
      }

      actions.schedule.checkDialog.resetPass()
    },
    [actions, createTrainingPass, passForm, passMode]
  )

  return (
    <Button color='primary' variant='contained' onClick={save}>
      Сохранить
    </Button>
  )
}
