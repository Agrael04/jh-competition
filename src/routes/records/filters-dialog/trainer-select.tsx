import React from 'react'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'components/select'
import { IDefaultComponentProps } from 'components/form-controller'

import useGetTrainersQuery from '../graphql/get-trainers'

const GymSelect = ({ value, onChange }: IDefaultComponentProps) => {
  const trainers = useGetTrainersQuery()

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value !== value) {
        onChange(e.target.value)
      } else {
        onChange(undefined)
      }
    },
    [onChange, value]
  )

  return (
    <Select
      value={value}
      onChange={handleChange}
      label={'Тренер'}
      fullWidth={true}
      variant='outlined'
    >
      {
        trainers.data?.trainers.map(trainer => (
          <MenuItem value={trainer._id} key={trainer._id}>
            {trainer.lastName} {trainer.firstName}
          </MenuItem>
        ))
      }
    </Select>
  )
}

export default GymSelect
