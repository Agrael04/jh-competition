import React from 'react'
import { IStoreState, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetSchedulesQuery from '../../queries/get-schedules'

import { trainers } from '../../data'

interface IProps {
  name: string
  label: string
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange: (name: any, value: any) => void
}

export default function TrainerSelect({ name, label, onChange, fieldSelector }: IProps) {
  const startTime = useSelector(fieldSelector('startTime')) as number
  const endTime = useSelector(fieldSelector('endTime')) as number
  const gym = useSelector(fieldSelector('gym')) as number
  const { data } = useGetSchedulesQuery()

  const filteredTrainers = React.useMemo(
    () => trainers.filter(trainer => {
      const schedules = data?.trainerSchedules.filter(ts => ts.trainer === trainer.id && ts.gym === gym) || []

      if (schedules.length === 0) {
        return false
      }

      if (!startTime && !endTime) {
        return true
      }

      if (startTime && endTime) {
        return schedules.filter(s => s.time >= startTime && s.time < endTime).length === (endTime - startTime)
      }

      if (startTime) {
        return schedules.find(s => s.time === startTime)
      }

      if (endTime) {
        return schedules.find(s => s.time === endTime - 1)
      }

      return true
    }),
    [data, startTime, endTime, gym]
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
        filteredTrainers.map(trainer => (
          <MenuItem value={trainer.id} key={trainer.id}>
            {trainer.firstName} {trainer.lastName}
          </MenuItem>
        ))
      }
    </Select>
  )
}
