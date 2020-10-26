import React, { useCallback } from 'react'

import { useFormContext } from 'react-hook-form'

import Select, { ISelectProps } from 'components/select'

import useGetGymsQuery from '../../queries/get-gyms'

type IProps = ISelectProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

export default function GymSelect(props: IProps) {
  const { value, error, onChange } = props
  const { setValue } = useFormContext()

  const gyms = useGetGymsQuery()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const resources = gyms.data?.resources.filter(r => r.gym._id === e.target.value) || []

      onChange(e.target.value)
      setValue('resources', resources.map(r => r._id))
    },
    [onChange, setValue, gyms]
  )

  return (
    <Select
      {...props}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error?.message}
    />
  )
}
