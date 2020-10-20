import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTrainingResource from '../../../mutations/update-training-resource'
import useCreateTrainingResource from '../../../mutations/create-training-resource'

import IResourceForm from './form'

export default function ResourcesBlock() {
  const actions = useActions()
  const form = useSelector(state => state.schedule.trainingDialog.resourceForm)

  const updateTrainingResource = useUpdateTrainingResource()
  const createTrainingResource = useCreateTrainingResource()

  const { handleSubmit, errors } = useFormContext()
  const disabled = Object.keys(errors).length > 0

  const submit = React.useCallback(
    async (resource: IResourceForm) => {
      if (!form.mode) {
        return
      }

      if (form.mode === 'update' && form._id) {
        await updateTrainingResource(form._id, resource)
      }

      if (form.mode === 'create') {
        await createTrainingResource(resource)
      }

      actions.schedule.trainingDialog.closeResource()
    },
    [actions, createTrainingResource, updateTrainingResource, form]
  )

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
