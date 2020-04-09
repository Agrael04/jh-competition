import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetSchedulesQuery from '../../queries/get-schedules'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.schedule.trainingDialog.trainingForm.trainer?.link

export default function TrainerSelect({ name, label }: IProps) {
  const actions = useActions()
  const { date, gym, endTime, startTime, trainer } = useSelector(state => ({
    date: state.schedule.trainingDialog.trainingForm.date,
    startTime: state.schedule.trainingDialog.trainingForm.startTime,
    endTime: state.schedule.trainingDialog.trainingForm.endTime,
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
    trainer: state.schedule.trainingDialog.trainingForm.trainer?.link,
  }))
  const { data, loading } = useGetSchedulesQuery(date)

  const trainers = React.useMemo(
    () => {
      console.log(data?.trainerSchedules)
      const schedules = data?.trainerSchedules
        .filter(ts => {
          if (ts.gym._id !== gym) {
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

  const handleChange = React.useCallback(
    (name, link) => {
      if (link) {
        actions.schedule.trainingDialog.updateField(name, { link })
      }
    },
    [actions]
  )

  React.useEffect(
    () => {
      if (!loading && !trainers?.find(ft => ft._id === trainer)) {
        handleChange('trainer', undefined)
      }
    },
    [loading, trainers, handleChange, trainer]
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
        trainers?.map(trainer => (
          <MenuItem value={trainer._id} key={trainer._id}>
            {trainer.firstName} {trainer.lastName}
          </MenuItem>
        ))
      }
    </Select>
  )
}
