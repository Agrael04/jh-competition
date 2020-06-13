import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

interface IProps {
  value: any
  label?: string
  name?: string
  helperText?: string
  disabled?: boolean
  onChange?: (e: any) => void
  className?: string
  rootClassName?: string
  children?: any
  variant?: 'filled' | 'outlined' | 'standard'
  fullWidth?: boolean
  multiple?: boolean
}

const heightStyle = { height: '56px' }

export default ({ value, onChange, label, helperText, name, variant, disabled, multiple, fullWidth, children }: IProps) => {
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
    <FormControl variant={variant} fullWidth={fullWidth} style={heightStyle}>
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <Select
        value={v}
        disabled={disabled}
        onChange={onChange}
        labelWidth={labelWidth}
        multiple={multiple}
        name={name}
      >
        {children}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
