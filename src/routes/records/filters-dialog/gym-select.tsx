import React from 'react'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'components/select'
import { IDefaultComponentProps } from 'components/form-controller'

import useGetGymsQuery from '../graphql/get-gyms'

const GymSelect = ({ value, onChange }: IDefaultComponentProps) => {
  const gyms = useGetGymsQuery()

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
      label={'Зал'}
      fullWidth={true}
      variant='outlined'
    >
      {
        gyms.data?.gyms.map(gym => (
          <MenuItem value={gym._id} key={gym._id}>
            {gym.name}
          </MenuItem>
        ))
      }
    </Select>
  )
}

export default GymSelect
