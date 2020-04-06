import React from 'react'
import { IStoreState, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetSchedulesQuery from '../../queries/get-schedules'

import { times } from '../../data'

interface IProps {
  name: string
  label: string
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange: (name: any, value: any) => void
}

export default function TrainerSelect({ name, label, onChange, fieldSelector }: IProps) {
  const startTime = useSelector(fieldSelector('startTime')) as number
  const trainer = useSelector(fieldSelector('trainer')) as string
  const gym = useSelector(fieldSelector('gym')) as number
  const date = useSelector(fieldSelector('date')) as Date
  const { data } = useGetSchedulesQuery(date)

  const filteredTimes = React.useMemo(
    () => {
      if (!trainer) {
        return times.filter(t => !startTime || t.id > startTime)
      }

      const schedules = data?.trainerSchedules.filter(ts =>
        ts.trainer._id === trainer && ts.gym === gym
      ) || []

      return schedules
        .filter(s => !startTime || s.time >= startTime)
        .map(s => times.find(t => t.id === s.time + 1)!)
    },
    [data, startTime, trainer, gym]
  )

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
        filteredTimes.map(time => (
          <MenuItem value={time.id} key={time.id}>
            {time.label}
          </MenuItem>
        ))
      }
    </Select>
  )
}
