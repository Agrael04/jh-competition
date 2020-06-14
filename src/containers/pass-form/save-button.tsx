import React from 'react'

import Button from '@material-ui/core/Button'

import useCreateTrainingPass from './graphql/create-training-pass'
import useUpdateTrainingPass from './graphql/update-training-pass'
import { IUpdateCacheFn } from 'utils/apollo-cache-updater'

import { useContext } from './context'

interface IProps {
  mode: 'create' | 'update' | null
  updateCacheOnCreate?: IUpdateCacheFn
  close: () => void
}

export default function SaveButton({ updateCacheOnCreate, mode, close }: IProps) {
  const pass = useContext(s => s.state.passForm)

  const createTrainingPass = useCreateTrainingPass(updateCacheOnCreate)
  const updateTrainingPass = useUpdateTrainingPass()

  const save = React.useCallback(
    async () => {
      if (mode === 'create') {
        await createTrainingPass(pass!)
      }

      if (mode === 'update') {
        await updateTrainingPass(pass!)
      }

      close()
    },
    [createTrainingPass, updateTrainingPass, pass, mode, close]
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
