import React from 'react'

import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

type IProps = Omit<FormControlLabelProps, 'control'> & {
  onChange?: any
  checked?: any
  error?: {
    message: string
  }
}

export default function CheckboxWrap(props: IProps) {
  const { checked, error, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <FormControl component='fieldset'>
      <FormGroup>
        <FormControlLabel
          control={(
            <Checkbox
              checked={checked}
              onChange={handleChange}
              color='primary'
            />
          )}
          label={props.label}
        />
      </FormGroup>
      {
        error && (
          <FormHelperText>{error.message}</FormHelperText>
        )
      }
    </FormControl>
  )
}
