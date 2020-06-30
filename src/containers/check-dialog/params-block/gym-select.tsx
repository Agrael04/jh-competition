import React from 'react'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'components/select'

import useGetGymsQuery from '../graphql/get-gyms'

import { useContext } from '../context'

const GymSelect = () => {
  const gyms = useGetGymsQuery()
  const activeGym = useContext(s => s.state.params.activeGym)

  return (
    <Select
      name='gym'
      value={activeGym}
      label={'Зал'}
      fullWidth={true}
      variant='outlined'
      disabled={true}
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
