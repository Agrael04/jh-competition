import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetTrainingResourcesQuery from '../../../queries/get-training-resources'
import useGetSchedulesQuery, { isTrainerAvailable } from '../../../queries/get-schedules'

import times from 'data/times'

interface IProps {
  fieldSelector: (name: any) => (state: IStoreState) => any
}

export default function TrainerSelect({ fieldSelector }: IProps) {
  const actions = useActions()
  const { date, gym, endTime, trainer, resource, _id } = useSelector(state => ({
    date: state.schedule.trainingDialog.trainingForm.date,
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
    endTime: state.schedule.trainingDialog.resourceForm?.endTime,
    trainer: state.schedule.trainingDialog.resourceForm?.trainer?.link,
    resource: state.schedule.trainingDialog.resourceForm?.resource?.link,
    _id: state.schedule.trainingDialog.resourceForm?._id,
  }))
  const trainingResources = useGetTrainingResourcesQuery()
  const { data } = useGetSchedulesQuery(date)

  const filteredTimes = React.useMemo(
    () => {
      const prevResource = trainingResources.data?.trainingResources
        .find(tr => tr._id !== _id && tr.resource._id === resource && tr.endTime < endTime!)

      return times
        .filter(t => !endTime || t.id < endTime)
        .filter(t => !prevResource || t.id >= prevResource?.endTime)
    },
    [endTime, _id, resource, trainingResources]
  )

  const handleChange = React.useCallback(
    (name, startTime) => {
      const isAvailable = trainer && isTrainerAvailable(data?.trainerSchedules || [], trainer, gym, startTime, endTime!)

      actions.schedule.trainingDialog.updateResource({
        startTime,
        endTime: endTime || (startTime < 27 ? startTime + 2 : endTime),
        trainer: isAvailable ? { link: trainer! } : undefined,
      })
    },
    [actions, endTime, data, trainer, gym]
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
