import React from 'react'
import { IStoreState } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetGymsQuery from '../../queries/get-gyms'

interface IProps {
  name: string
  label: string
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange: (name: any, value: any) => void
}

export default function GymSelect({ name, label, onChange, fieldSelector }: IProps) {
  const gyms = useGetGymsQuery()

  return (
    <Select
      name={name}
      onChange={onChange}
      fieldSelector={fieldSelector}
      label={label}
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
