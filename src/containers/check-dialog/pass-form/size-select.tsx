import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { universalSizes, noTrainerSizes } from '../data'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.checkDialog.passForm?.size

export default function SizeSelect({ name, label }: IProps) {
  const type = useSelector(state => state.checkDialog.passForm?.type)
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, size) => {
      let pass = {}

      if (type === 'universal') {
        const s = universalSizes.find(s => s.value === size)!
        pass = {
          size,
          capacity: s.capacity,
        }
      } else if (type === 'no_trainer') {
        const s = noTrainerSizes.find(s => s.value === size)!

        pass = {
          size,
          capacity: s.capacity,
        }
      }
      actions.checkDialog.updatePass(pass)
    },
    [actions, type]
  )

  if (type !== 'universal' && type !== 'no_trainer') {
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
        type === 'universal' && universalSizes.map(size => (
          <MenuItem value={size.value} key={size.value}>
            {size.text}
          </MenuItem>
        ))
      }
      {
        type === 'no_trainer' && noTrainerSizes.map(size => (
          <MenuItem value={size.value} key={size.value}>
            {size.text}
          </MenuItem>
        ))
      }
    </Select>
  )
}
