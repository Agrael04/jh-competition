import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTrainingResource from '../../../mutations/update-training-resource'
import useCreateTrainingResource from '../../../mutations/create-training-resource'

import { ITrainingResourceForm } from 'interfaces/training'

interface IForm {
  resource?: {
    link: string
  } | null
  trainer?: {
    link: string
  } | null
  startTime?: number | null
  endTime?: number | null
}

export default function ResourcesBlock() {
  const actions = useActions()
  const form = useSelector(state => state.schedule.trainingDialog.resourceForm)
  const trainingForm = useSelector(state => state.schedule.trainingDialog.trainingForm)

  const updateTrainingResource = useUpdateTrainingResource()
  const createTrainingResource = useCreateTrainingResource()

  const { handleSubmit, errors } = useFormContext()
  const disabled = Object.keys(errors).length > 0

  const submit = React.useCallback(
    async (resource: IForm) => {
      if (!form.mode) {
        return
      }

      if (form.mode === 'update') {
        await updateTrainingResource({ ...form.resource, ...resource })
      }

      if (form.mode === 'create') {
        await createTrainingResource(trainingForm!, { ...form.resource, ...resource } as ITrainingResourceForm)
      }

      actions.schedule.trainingDialog.closeResource()
    },
    [actions, createTrainingResource, updateTrainingResource, trainingForm, form]
  )

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
