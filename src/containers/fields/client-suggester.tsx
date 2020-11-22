import React, { useCallback } from 'react'

import ClientSuggester, { ISuggesterProps } from 'containers/client-suggester'

type OmittedProps = Omit<Omit<ISuggesterProps, 'value'>, 'onChange'>

type IProps = OmittedProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
  initialFilter?: string
  rights?: string[]
  label: string
}

export default function ClientSuggesterWrap(props: IProps) {
  const { value, error, onChange } = props

  const handleChange = useCallback(
    (link: string | null) => {
      onChange(link ? { link } : undefined)
    },
    [onChange]
  )

  return (
    <ClientSuggester
      {...props}
      value={value ? value.link : null}
      handleChange={handleChange}
      error={!!error}
      helperText={error?.message}
    />
  )
}
