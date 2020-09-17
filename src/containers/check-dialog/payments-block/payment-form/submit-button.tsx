import React from 'react'

import { useFormContext } from 'react-hook-form'

import Button from '@material-ui/core/Button'

interface IProps {
  submit: (form: any) => void
}

export default function PaymentForm({ submit }: IProps) {
  const { handleSubmit, errors } = useFormContext()

  const disabled = Object.keys(errors).length > 0

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
