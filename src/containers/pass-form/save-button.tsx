import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTrainingPass from './graphql/create-training-pass'
import useUpdateTrainingPass from './graphql/update-training-pass'
import { IUpdateCacheFn } from 'utils/apollo-cache-updater'

interface IProps {
  updateCacheOnCreate?: IUpdateCacheFn
}

export default function SaveButton({ updateCacheOnCreate }: IProps) {
  const actions = useActions()
  const { passMode, pass } = useSelector(state => ({
    passMode: state.passForm.passMode,
    pass: state.passForm.passForm,
  }))

  const createTrainingPass = useCreateTrainingPass(updateCacheOnCreate)
  const updateTrainingPass = useUpdateTrainingPass()

  const save = React.useCallback(
    async () => {
      if (passMode === 'create') {
        await createTrainingPass()
      }

      if (passMode === 'update') {
        await updateTrainingPass()
      }

      actions.passForm.close()
    },
    [actions, createTrainingPass, updateTrainingPass, passMode]
  )

  const disabled = React.useMemo(
    () => {
      return (
        !pass ||
        !pass.type ||
        !pass.duration ||
        (pass.activation === undefined) ||
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
