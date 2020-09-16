import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select, { SelectProps } from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

export interface ISelectProps extends SelectProps {
  value?: any
  helperText?: string
  onChange?: (e: any) => void
}

const heightStyle = { height: '56px' }

export default ({ value, onChange, label, helperText, name, variant, disabled, multiple, fullWidth, children, error, renderValue }: ISelectProps) => {
  const inputLabel = React.useRef<HTMLLabelElement>(null)
  const [labelWidth, setLabelWidth] = React.useState(0)

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth)
  }, [])

  const v = React.useMemo(
    () => {
      if (Array.isArray(value)) {
        return value
      }

      if (value === undefined || value === null) {
        return ''
      }

      return value?.toString() || ''
    }, [value]
  )

  return (
    <FormControl variant={variant} fullWidth={fullWidth} style={heightStyle} error={error}>
      <InputLabel error={error} ref={inputLabel}>{label}</InputLabel>
      <Select
        value={v}
        disabled={disabled}
        onChange={onChange}
        labelWidth={labelWidth}
        multiple={multiple}
        name={name}
        error={error}
        renderValue={renderValue}
      >
        {children}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  )
}
