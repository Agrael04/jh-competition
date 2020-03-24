import React from 'react'
import { IStoreState, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { trainerSchedule, trainers } from '../../data'

interface IProps {
  name: string
  label: string
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange: (name: any, value: any) => void
}

export default function TrainerSelect({ name, label, onChange, fieldSelector }: IProps) {
  const startTime = useSelector(fieldSelector('startTime')) as number
  const endTime = useSelector(fieldSelector('endTime')) as number

  const filteredTrainers = React.useMemo(
    () => trainers.filter(trainer => trainerSchedule.find(ts => {
      if (ts.id !== trainer.id) {
        return false
      }

      if (!startTime && !endTime) {
        return true
      }

      if (startTime && endTime) {
        return ts.times.filter(t => t >= startTime && t < endTime).length === (endTime - startTime)
      }

      if (startTime) {
        return !!ts.times.find(t => t === startTime)
      }

      if (endTime) {
        return !!ts.times.find(t => t === endTime - 1)
      }


      return true
    })),
    [startTime, endTime]
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
