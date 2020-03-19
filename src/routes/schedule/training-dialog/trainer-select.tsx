import React from 'react'
import { IStoreState, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { trainerSchedule, trainers } from '../data'

interface IProps {
  name: string
  label: string
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange: (name: any, value: any) => void
}

export default function TrainerSelect({ name, label, onChange, fieldSelector }: IProps) {
  const time = useSelector(fieldSelector('startTime')) as number

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
        trainers
          .filter(trainer => trainerSchedule.find(ts => ts.id === trainer.id && ts.times.includes(time)))
          .map(trainer => (
            <MenuItem value={trainer.id} key={trainer.id}>
              {trainer.firstName} {trainer.lastName}
            </MenuItem>
          ))
      }
    </Select>
  )
}
