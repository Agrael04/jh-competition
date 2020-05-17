import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { passTypes } from '../data'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.schedule.checkDialog.passForm?.type

export default function ResourceSelect({ name, label }: IProps) {
  const createdAt = useSelector(state => state.schedule.checkDialog.passForm?.createdAt)
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, type) => {
      let pass = {}

      if (type === 'universal') {
        const expiresIn = new Date(createdAt!)
        const activatesIn = new Date(createdAt!)
        expiresIn.setDate(expiresIn.getDate() + 76)
        activatesIn.setDate(expiresIn.getDate() + 31)

        pass = {
          type,
          size: 'XL',
          capacity: 24,
          createdAt,
          activatedAt: null,
          expiresIn,
          activatesIn,
        }
      } else if (type === 'no_trainer') {
        const expiresIn = new Date(createdAt!)
        expiresIn.setDate(expiresIn.getDate() + 45)

        pass = {
          type,
          size: '40',
          capacity: 80,
          createdAt,
          activatedAt: createdAt,
          activatesIn: createdAt,
          expiresIn,
        }
      } else if (type === 'child_sport' || type === 'adult_sport') {
        const expiresIn = new Date(createdAt!)
        expiresIn.setDate(expiresIn.getDate() + 31)

        pass = {
          type,
          size: null,
          capacity: null,
          createdAt,
          activatedAt: createdAt,
          activatesIn: createdAt,
          expiresIn,
        }
      }
      actions.schedule.checkDialog.updatePass(pass)
    },
    [actions, createdAt]
  )

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
        passTypes.map(r => (
          <MenuItem value={r.value} key={r.value}>
            {r.text}
          </MenuItem>
        ))
      }
    </Select>
  )
}
