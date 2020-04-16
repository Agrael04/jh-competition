import React from 'react'
import { IStoreState, useActions, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetGymsQuery from '../../queries/get-gyms'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.schedule.trainingDialog.trainingForm.gym.link

export default function GymSelect({ name, label }: IProps) {
  const actions = useActions()
  const gyms = useGetGymsQuery()
  const trainingResources = useSelector(state => state.schedule.trainingDialog.resources)

  const handleChange = React.useCallback(
    (name, link) => {
      actions.schedule.trainingDialog.updateField(name, { link })
    },
    [actions]
  )

  return (
    <Select
      name={name}
      onChange={handleChange}
      fieldSelector={selector}
      label={label}
      fullWidth={true}
      variant='outlined'
      disabled={trainingResources.length > 0}
      helperText='Нельзя сменить зал при активных ресурсах'
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
