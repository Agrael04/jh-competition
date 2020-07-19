import React from 'react'

import { useFormContext } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'

interface IProps {
  value: string
  onChange: (value: any) => void
}

export default function NoteInput({ onChange, value }: IProps) {
  const { errors } = useFormContext()
  const error = errors.note

  return (
    <TextField
      value={value || ''}
      onChange={onChange}
      name='note'
      label={'Заметки'}
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    />
  )
}
