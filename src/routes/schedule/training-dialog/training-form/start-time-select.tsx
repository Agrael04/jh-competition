import TextField, { TextFieldProps } from '@material-ui/core/TextField'

import times from 'data/times'

type IProps = TextFieldProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

export default function StartTimeSelect(props: IProps) {
  const { value } = props

  return (
    <TextField
      {...props}
      value={times.find(t => t.id === value)?.label || ''}
      label='Время конца'
      variant='outlined'
      disabled={true}
      fullWidth={true}
    />
  )
}
