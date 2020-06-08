import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { passTypes, getSizes } from 'data/training-passes'

interface IProps {
  disabledOpenType?: boolean
}

const selector = () => (state: IStoreState) => state.passForm.passForm?.type

export default function TypeSelect({ disabledOpenType }: IProps) {
  const createdAt = useSelector(state => state.passForm.passForm?.createdAt)
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, type) => {
      const passType = passTypes.find(t => t.value === type)
      const sizes = getSizes(type)

      const pass = {
        type,
        duration: passType?.duration,
        activation: passType?.activation,
        size: sizes ? sizes[0].value : null,
        capacity: sizes ? sizes[0].capacity : null,
        price: sizes ? sizes[0].price : null,
        isActive: true,
        createdAt,
      }

      actions.passForm.update(pass)
    },
    [actions, createdAt]
  )

  return (
    <Select
      name={'type'}
      onChange={handleChange}
      fieldSelector={selector}
      label={'Тип абонимента'}
      fullWidth={true}
      variant='outlined'
    >
      {
        passTypes.filter(r => !disabledOpenType || r.value !== 'open').map(r => (
          <MenuItem value={r.value} key={r.value}>
            {r.text}
          </MenuItem>
        ))
      }
    </Select>
  )
}
