import React from 'react'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'components/select'

import { passTypes, getSizes } from 'data/training-passes'

import { useContext } from './context'

interface IProps {
  disabledOpenType?: boolean
}

export default function TypeSelect({ disabledOpenType }: IProps) {
  const value = useContext(s => s.state.passForm?.type)
  const updateForm = useContext(s => s.updateForm)

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const type = e.target.value as any

      const passType = passTypes.find(t => t.value === type)
      const sizes = getSizes(type)

      const pass = {
        type,
        duration: passType?.duration,
        activation: passType?.activation,
        size: sizes ? sizes[0].value : null,
        capacity: sizes ? sizes[0].capacity : null,
        price: sizes ? sizes[0].price : null,
      }

      updateForm(pass)
    },
    [updateForm]
  )

  return (
    <Select
      name={'type'}
      onChange={handleChange}
      value={value}
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
