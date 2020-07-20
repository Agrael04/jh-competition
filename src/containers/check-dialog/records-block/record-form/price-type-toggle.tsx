import React from 'react'
import { useSelector } from 'store'
import { useFormContext } from 'react-hook-form'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

interface IProps {
  value: 'units' | 'money' | null
}

export default function PriceTypeToggle({ value }: IProps) {
  const { reset } = useFormContext()

  const record = useSelector(state => state.checkDialog.recordForm.record!)

  const handleTypeChange = React.useCallback(
    (e, priceType) => {
      if (priceType) {
        reset({
          priceType,
          priceAmount: priceType === record.priceType ? record.priceAmount : null,
        })
      }
    },
    [reset, record]
  )

  return (
    <ToggleButtonGroup
      exclusive={true}
      value={value}
      onChange={handleTypeChange}
    >
      <ToggleButton value='money'>
        Грн
      </ToggleButton>
      <ToggleButton value='units'>
        АБ
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
