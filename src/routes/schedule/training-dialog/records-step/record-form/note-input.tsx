import React from 'react'

import TextField from '@material-ui/core/TextField'

interface IProps {
  value: string
  onChange: (value: any) => void
}

export default function NoteInput({ onChange, value }: IProps) {
  return (
    <TextField
      value={value || ''}
      onChange={onChange}
      name='note'
      label={'Заметки'}
      fullWidth={true}
      variant='outlined'
    />
  )
}
