import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateCheckPosition from '../../graphql/create-check-position'
import useUpdateCheckPosition from '../../graphql/update-check-position'

interface IForm {
  type?: string
  service?: string
  priceAmount?: number | null
  priceType?: 'money' | 'units' | null
}

export default function ServiceForm() {
  const actions = useActions()
  const form = useSelector(state => state.checkDialog.positionForm)

  const createCheckPosition = useCreateCheckPosition()
  const updateCheckPosition = useUpdateCheckPosition()

  const mutations = {
    create: createCheckPosition,
    update: updateCheckPosition,
  }

  const { handleSubmit, errors } = useFormContext()

  const disabled = Object.keys(errors).length > 0

  const submit = React.useCallback(
    async (position: IForm) => {
      if (!form.mode) {
        return
      }

      await mutations[form.mode]({ ...form.position, ...position })

      actions.checkDialog.closePositionForm()
    },
    [form, mutations, actions]
  )

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
