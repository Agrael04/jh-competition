import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTrainingPass from './graphql/create-training-pass'
import useUpdateTrainingPass from './graphql/update-training-pass'
import { IUpdateCacheFn } from 'utils/apollo-cache-updater'

import { useContext } from './context'

interface IProps {
  updateCacheOnCreate?: IUpdateCacheFn
}

export default function SaveButton({ updateCacheOnCreate }: IProps) {
  const actions = useActions()
  const pass = useContext(s => s.state.passForm)

  const passMode = useSelector(state => state.passForm.passMode)

  const createTrainingPass = useCreateTrainingPass(updateCacheOnCreate)
  const updateTrainingPass = useUpdateTrainingPass()

  console.log(pass)

  const save = React.useCallback(
    async () => {
      if (passMode === 'create') {
        await createTrainingPass(pass!)
      }

      if (passMode === 'update') {
        await updateTrainingPass(pass!)
      }

      actions.passForm.close()
    },
    [actions, createTrainingPass, updateTrainingPass, pass, passMode]
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
