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
  const { date, gym, startTime, trainer, resource, _id } = useSelector(state => ({
    date: state.schedule.trainingDialog.trainingForm.date,
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
    startTime: state.schedule.trainingDialog.resourceForm?.startTime,
    trainer: state.schedule.trainingDialog.resourceForm?.trainer?.link,
    resource: state.schedule.trainingDialog.resourceForm?.resource?.link,
    _id: state.schedule.trainingDialog.resourceForm?._id,
  }))
  const trainingResources = useGetTrainingResourcesQuery()
  const { data } = useGetSchedulesQuery(date)

  const filteredTimes = React.useMemo(
    () => {
      const nextResource = trainingResources.data?.trainingResources
        .find(tr => tr._id !== _id && tr.resource._id === resource && tr.startTime > startTime!)

      return times
        .filter(t => !startTime || t.id > startTime)
        .filter(t => !nextResource || t.id <= nextResource?.startTime)
    },
    [startTime, _id, resource, trainingResources]
  )

  const handleChange = React.useCallback(
    (name, endTime) => {
      const isAvailable = trainer && isTrainerAvailable(data?.trainerSchedules || [], trainer, gym, startTime!, endTime)

      actions.schedule.trainingDialog.updateResource({
        endTime,
        startTime: startTime || (endTime > 2 ? endTime - 2 : startTime),
        trainer: isAvailable ? { link: trainer! } : undefined,
      })
    },
    [actions, startTime, data, trainer, gym]
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
