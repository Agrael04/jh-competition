import React from 'react'
import { IStoreState, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetSchedulesQuery from '../../queries/get-schedules'

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
  const date = useSelector(fieldSelector('date')) as Date
  const trainer = useSelector(fieldSelector('trainer')) as string
  const { data, loading } = useGetSchedulesQuery(date)

  const trainers = React.useMemo(
    () => {
      const schedules = data?.trainerSchedules
        .filter(ts => {
          if (ts.gym !== gym) {
            return false
          }

          if (startTime && ts.time < startTime) {
            return false
          }

          if (endTime && ts.time >= endTime) {
            return false
          }

          return true
        })
        .filter((ts, index, arr) => {
          return arr.filter(t => t.trainer._id === ts.trainer._id).length === (endTime - startTime)
        })

      const trainers = schedules?.map(sh => sh.trainer).filter((tr, index, arr) => {
        return arr.findIndex(item => item._id === tr._id) === index
      })

      return trainers
    },
    [data, startTime, endTime, gym]
  )

  React.useEffect(
    () => {
      if (!loading && !trainers?.find(ft => ft._id === trainer)) {
        onChange('trainer', undefined)
      }
    },
    [loading, trainers, onChange, trainer]
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
        trainers?.map(trainer => (
          <MenuItem value={trainer._id} key={trainer._id}>
            {trainer.firstName} {trainer.lastName}
          </MenuItem>
        ))
      }
    </Select>
  )
}
