import { useCallback } from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector } from 'store'

import Button from '@material-ui/core/Button'

import { selectTrainingId, selectTrainingForm } from 'store/ui/pages/schedule/training-dialog/selectors'
import { selectPageFilters } from 'store/ui/pages/schedule/page/selectors'

import useCreateNewTraining from '../../mutations/new-training/create'
import useUpdateNewTraining from '../../mutations/new-training/update'

import IResourceForm from './form'

export default function ResourcesBlock() {
  const form = useSelector(selectTrainingForm)
  const filters = useSelector(selectPageFilters)
  const trainingId = useSelector(selectTrainingId)

  const createTraining = useCreateNewTraining()
  const updateTraining = useUpdateNewTraining()

  const { handleSubmit, errors } = useFormContext()
  const disabled = Object.keys(errors).length > 0

  const submit = useCallback(
    async (values: IResourceForm) => {
      if (!form.mode) {
        return
      }

      if (form.mode === 'update' && form._id) {
        await updateTraining(form._id, values)
      }

      if (form.mode === 'create') {
        await createTraining({
          ...values,
          date: filters.date,
          gym: { link: filters.gym },
          resource: form.defaultValues?.resource!,
        })
      }
    },
    [createTraining, updateTraining, form, trainingId]
  )

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
