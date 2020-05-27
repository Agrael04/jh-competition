import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetSchedulesQuery from '../../../queries/get-schedules'

import times from 'data/times'

interface IProps {
  fieldSelector: (name: any) => (state: IStoreState) => any
}

export default function TrainerSelect({ fieldSelector }: IProps) {
  const actions = useActions()
  const { date, gym, startTime, trainer } = useSelector(state => ({
    date: state.schedule.trainingDialog.trainingForm.date,
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
    startTime: state.schedule.trainingDialog.resourceForm?.startTime,
    trainer: state.schedule.trainingDialog.resourceForm?.trainer?.link,
  }))
  const { data } = useGetSchedulesQuery(date)

  const filteredTimes = React.useMemo(
    () => {
      if (!trainer) {
        return times.filter(t => !startTime || t.id > startTime)
      }

      const schedules = data?.trainerSchedules.filter(ts =>
        ts.trainer._id === trainer && ts.gym._id === gym
      ) || []

      return schedules
        .filter(s => !startTime || s.time >= startTime)
        .map(s => times.find(t => t.id === s.time + 1)!)
    },
    [data, startTime, trainer, gym]
  )

  const handleChange = React.useCallback(
    (name, endTime) => {
      actions.schedule.trainingDialog.updateResource({
        endTime,
        startTime: startTime || (endTime > 2 ? endTime - 2 : startTime),
      })
    },
    [actions, startTime]
  )
  return (
    <Select
      name='endTime'
      onChange={handleChange}
      fieldSelector={fieldSelector}
      label={'Время конца'}
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
