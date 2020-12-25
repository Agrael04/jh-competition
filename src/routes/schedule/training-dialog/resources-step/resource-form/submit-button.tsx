import { useCallback } from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector, useDispatch } from 'store'

import Button from '@material-ui/core/Button'

import { closeResource } from 'store/ui/pages/schedule/training-dialog/actions'

import { selectTrainingId, selectResourceForm } from 'store/ui/pages/schedule/training-dialog/selectors'

import useUpdateTrainingResource from '../../../mutations/update-training-resource'
import useCreateTrainingResource from '../../../mutations/create-training-resource'

import IResourceForm from './form'

export default function ResourcesBlock() {
  const dispatch = useDispatch()
  const form = useSelector(selectResourceForm)
  const trainingId = useSelector(selectTrainingId)

  const updateTrainingResource = useUpdateTrainingResource()
  const createTrainingResource = useCreateTrainingResource()

  const { handleSubmit, errors } = useFormContext()
  const disabled = Object.keys(errors).length > 0

  const submit = useCallback(
    async (resource: IResourceForm) => {
      if (!form.mode) {
        return
      }

      if (form.mode === 'update' && form._id) {
        await updateTrainingResource(form._id, resource)
      }

      if (form.mode === 'create' && trainingId) {
        await createTrainingResource(trainingId, resource)
      }

      dispatch(closeResource())
    },
    [createTrainingResource, updateTrainingResource, form, trainingId]
  )

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
