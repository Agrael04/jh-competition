import React from 'react'
import { IStoreState, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { paymentTypes } from '../../data'

const selector = () => (state: IStoreState) => state.checkDialog.paymentForm?.type

export default function TypeSelect() {
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, type) => {
      actions.checkDialog.updatePayment({ type })
    },
    [actions]
  )

  return (
    <Select
      name='type'
      label='Тип оплаты'
      onChange={handleChange}
      fieldSelector={selector}
      fullWidth={true}
      variant='outlined'
    >
      {
        paymentTypes.map(type => (
          <MenuItem value={type.value} key={type.value}>
            {type.text}
          </MenuItem>
        ))
      }
    </Select>
  )
}
