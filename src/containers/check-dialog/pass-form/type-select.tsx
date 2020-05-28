import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { passTypes } from '../data'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.checkDialog.passForm?.type

export default function TypeSelect({ name, label }: IProps) {
  const createdAt = useSelector(state => state.checkDialog.passForm?.createdAt)
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, type) => {
      let pass = {}

      if (type === 'universal') {
        // const expiresIn = new Date(createdAt!)
        // const activatesIn = new Date(createdAt!)
        // expiresIn.setDate(expiresIn.getDate() + 76)
        // activatesIn.setDate(activatesIn.getDate() + 31)

        pass = {
          type,
          size: 'XL',
          capacity: 24,
          duration: 45,
          activation: 31,
          createdAt,
          // activatesIn,
          // activatedAt: null,
          // expiresIn,
        }
      } else if (type === 'no_trainer') {
        // const expiresIn = new Date(createdAt!)
        // expiresIn.setDate(expiresIn.getDate() + 45)

        pass = {
          type,
          size: '40',
          capacity: 80,
          duration: 45,
          activation: 0,
          createdAt,
          // activatesIn: createdAt,
          // activatedAt: createdAt,
          // expiresIn,
        }
      } else if (type === 'child_sport' || type === 'adult_sport') {
        // const expiresIn = new Date(createdAt!)
        // expiresIn.setDate(expiresIn.getDate() + 31)

        pass = {
          type,
          size: null,
          capacity: null,
          duration: 31,
          activation: 0,
          createdAt,
          // activatesIn: createdAt,
          // activatedAt: createdAt,
          // expiresIn,
        }
      }
      actions.checkDialog.updatePass(pass)
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
