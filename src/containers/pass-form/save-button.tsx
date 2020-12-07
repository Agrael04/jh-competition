import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import Button from '@material-ui/core/Button'

import useCreateTrainingPass from './graphql/create-training-pass'
import useUpdateTrainingPass from './graphql/update-training-pass'
import { IUpdateCacheFn } from 'utils/apollo-cache-updater'

import { ITrainingPassForm } from 'interfaces/training-pass'

interface IProps {
  mode: 'create' | 'update' | null
  updateCacheOnCreate?: IUpdateCacheFn
  close: () => void
}

export default function SaveButton({ updateCacheOnCreate, mode, close }: IProps) {
  const { handleSubmit, errors } = useFormContext()

  const createTrainingPass = useCreateTrainingPass(updateCacheOnCreate)
  const updateTrainingPass = useUpdateTrainingPass()

  const submit = useCallback(
    async (form: ITrainingPassForm) => {
      if (mode === 'create') {
        await createTrainingPass(form)
      }

      if (mode === 'update') {
        await updateTrainingPass(form)
      }

      close()
    },
    [createTrainingPass, updateTrainingPass, mode, close]
  )

  const disabled = Object.keys(errors).length > 0

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
