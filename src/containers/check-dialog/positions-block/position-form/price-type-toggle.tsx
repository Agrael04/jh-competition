import React from 'react'

import { useFormContext } from 'react-hook-form'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

interface IProps {
  value: 'units' | 'money' | null
}

export default function PriceTypeToggle({ value }: IProps) {
  const { watch, reset } = useFormContext()
  const type = watch('type')
  const service = watch('service')

  const handleChange = React.useCallback(
    (e, priceType) => {
      if (priceType) {
        reset({
          type,
          service,
          priceType,
          priceAmount: null,
        })
      }
    },
    [reset, type, service]
  )

  return (
    <ToggleButtonGroup
      exclusive={true}
      value={value}
      onChange={handleChange}
    >
      <ToggleButton value='money' disabled={type !== 'training'}>
        Грн
      </ToggleButton>
      <ToggleButton value='units' disabled={type !== 'training'}>
        АБ
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
