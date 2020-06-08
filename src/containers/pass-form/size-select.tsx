import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { getSizes } from 'data/training-passes'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.passForm.passForm?.size

export default function SizeSelect({ name, label }: IProps) {
  const type = useSelector(state => state.passForm.passForm?.type)
  const actions = useActions()

  const sizes = React.useMemo(
    () => {
      return getSizes(type)
    }, [type]
  )

  const handleChange = React.useCallback(
    (name, size) => {
      const s = sizes?.find(s => s.value === size)!
      const pass = {
        size,
        capacity: s.capacity,
        price: s.price,
      }
      actions.passForm.update(pass)
    },
    [actions, sizes]
  )

  if (!sizes) {
    return null
  }

  return (
    <Select
      name={name}
      onChange={handleChange}
      fieldSelector={selector}
      label={label}
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
