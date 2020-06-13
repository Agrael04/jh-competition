import React from 'react'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'components/select'

import { getSizes } from 'data/training-passes'

import { useContext } from './context'

export default function SizeSelect() {
  const size = useContext(s => s.state.passForm?.size)
  const type = useContext(s => s.state.passForm?.type)
  const updateForm = useContext(s => s.updateForm)

  const sizes = React.useMemo(
    () => {
      return getSizes(type)
    }, [type]
  )

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const size = e.target.value
      const s = sizes?.find(s => s.value === size)!
      const pass = {
        size,
        capacity: s.capacity,
        price: s.price,
      }
      updateForm(pass)
    },
    [updateForm, sizes]
  )

  if (!sizes) {
    return null
  }

  return (
    <Select
      name={'size'}
      onChange={handleChange}
      value={size}
      label={'Размер'}
      fullWidth={true}
      variant='outlined'
    >
      {
        sizes.map(size => (
          <MenuItem value={size.value} key={size.value}>
            {size.text}
          </MenuItem>
        ))
      }
    </Select>
  )
}
