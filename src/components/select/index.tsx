import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

interface IProps {
  value: any
  label?: string
  name?: string
  helperText?: string
  disabled?: boolean
  onChange?: (e: any) => void
  className?: string
  rootClassName?: string
  children: any
  variant?: 'filled' | 'outlined' | 'standard'
  fullWidth?: boolean
  multiple?: boolean
}

export default ({ value, onChange, label, name, variant, disabled, multiple, fullWidth, children }: IProps) => {
  const inputLabel = React.useRef<HTMLLabelElement>(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth)
  }, [])

  return (
    <FormControl variant={variant} fullWidth={fullWidth}>
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <Select
        value={value}
        disabled={disabled}
        onChange={onChange}
        labelWidth={labelWidth}
        multiple={multiple}
        name={name}
      >
        {children}
      </Select>
    </FormControl>
  )
}
