import { useCallback } from 'react'

import { useActions, useSelector } from 'store'
import { useFormContext } from 'react-hook-form'

import Button from '@material-ui/core/Button'

import IForm from './form'

import useCreatePosition from '../../graphql/create-check-position'
import useUpdatePosition from '../../graphql/update-check-position'

export default function SubmitButton() {
  const actions = useActions()

  const positionForm = useSelector(state => state.checkDialog.positionForm)

  const { handleSubmit, errors } = useFormContext()

  const createPosition = useCreatePosition()
  const updatePosition = useUpdatePosition()

  const submit = useCallback(
    async (values: IForm) => {
      if (positionForm._id) {
        await updatePosition(positionForm._id, values)
      } else {
        await createPosition(values)
      }

      actions.checkDialog.closePositionForm()
    },
    [createPosition, updatePosition, actions, positionForm]
  )

  const disabled = Object.keys(errors).length > 0

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
