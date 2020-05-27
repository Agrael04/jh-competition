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
  const { date, gym, endTime, trainer } = useSelector(state => ({
    date: state.schedule.trainingDialog.trainingForm.date,
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
    endTime: state.schedule.trainingDialog.resourceForm?.endTime,
    trainer: state.schedule.trainingDialog.resourceForm?.trainer?.link,
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

  const handleChange = React.useCallback(
    (name, startTime) => {
      actions.schedule.trainingDialog.updateResource({
        startTime,
        endTime: endTime || (startTime < 27 ? startTime + 2 : endTime),
      })
    },
    [actions, endTime]
  )

  return (
    <Select
      name='startTime'
      onChange={handleChange}
      fieldSelector={fieldSelector}
      label={'Время начала'}
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
