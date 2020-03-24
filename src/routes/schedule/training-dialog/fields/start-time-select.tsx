import React from 'react'
import { IStoreState, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { trainerSchedule, times } from '../../data'

interface IProps {
  name: string
  label: string
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange: (name: any, value: any) => void
}

export default function TrainerSelect({ name, label, onChange, fieldSelector }: IProps) {
  const endTime = useSelector(fieldSelector('endTime')) as number
  const trainer = useSelector(fieldSelector('trainer')) as number

  const filteredTimes = React.useMemo(
    () => {
      const ts = trainerSchedule.find(ts => ts.id === trainer)

      if (ts) {
        const trainerTimes = times
          .filter(t => ts.times.find(time => t.id === time))
          .filter(t => !endTime || t.id < endTime)

        const index = trainerTimes.findIndex((item, index) => index && item.id - 1 !== trainerTimes[index - 1].id)

        if (!endTime || index === -1) {
          return trainerTimes
        }

        return trainerTimes.slice(index, trainerTimes.length)
      }

      return times
        .filter((t, index) => times.length - 1 !== index)
        .filter(t => !endTime || t.id < endTime)
    },
    [endTime, trainer]
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
