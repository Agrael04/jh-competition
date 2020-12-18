import { useCallback, ChangeEvent } from 'react'

import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

type IProps = Omit<FormControlLabelProps, 'control'> & {
  onChange?: any
  checked?: any
  value?: boolean
  error?: {
    message: string
  }
}

export default function CheckboxWrap(props: IProps) {
  const { value, error, onChange } = props

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked)
    },
    [onChange]
  )

  return (
    <FormControl component='fieldset'>
      <FormGroup>
        <FormControlLabel
          control={(
            <Checkbox
              checked={value}
              onChange={handleChange}
              color='primary'
            />
          )}
          label={props.label}
        />
      </FormGroup>
      {
        error && (
          <FormHelperText>
            {error.message}
          </FormHelperText>
        )
      }
    </FormControl>
  )
}
