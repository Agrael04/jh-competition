import React from 'react'
import { IStoreState, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetSchedulesQuery from '../../queries/get-schedules'

import times from 'data/times'

interface IProps {
  name: string
  label: string
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange: (name: any, value: any) => void
}

export default function TrainerSelect({ name, label, onChange, fieldSelector }: IProps) {
  const { date, gym, endTime, trainer } = useSelector(state => ({
    date: state.schedule.trainingDialog.trainingForm.date,
    endTime: state.schedule.trainingDialog.trainingForm.endTime,
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
    trainer: state.schedule.trainingDialog.trainingForm.trainer?.link,
  }))
  const { data } = useGetSchedulesQuery(date)

  const filteredTimes = React.useMemo(
    () => {
      if (!trainer) {
        return times.filter(t => !endTime || t.id < endTime)
      }

      const schedules = data?.trainerSchedules.filter(ts =>
        ts.trainer._id === trainer && ts.gym._id === gym
      ) || []

      return schedules
        .filter(s => !endTime || s.time < endTime)
        .map(s => times.find(t => t.id === s.time)!)
    },
    [data, endTime, trainer, gym]
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
