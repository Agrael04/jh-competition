import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetGymsQuery from '../../queries/get-gyms'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.schedule.trainingDialog.resourceForm?.resource.link

export default function ResourceSelect({ name, label }: IProps) {
  const actions = useActions()
  const { gym } = useSelector(state => ({
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
  }))
  const gyms = useGetGymsQuery()

  const resources = React.useMemo(
    () => {
      return gyms.data?.resources.filter(r => r.gym._id === gym) || []
    }, [gyms, gym]
  )

  const handleChange = React.useCallback(
    (name, link) => {
      actions.schedule.trainingDialog.updateResourceField(name, { link })
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
    >
      {
        resources.map(r => (
          <MenuItem value={r._id} key={r._id}>
            {r.name}
          </MenuItem>
        ))
      }
    </Select>
  )
}
