import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import times from 'data/times'
import useGetTrainingQuery from '../../../queries/get-training'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.schedule.trainingDialog.recordForm?.resource?.link

export default function RecordSelect({ name, label }: IProps) {
  const actions = useActions()
  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)

  const handleChange = React.useCallback(
    (name, link: string) => {
      actions.schedule.trainingDialog.updateRecordField(name, { link })
    },
    [actions]
  )

  const getResouceLabel = React.useCallback(
    resource => {
      const name = resource?.resource?.name
      const st = times.find(t => t.id === resource.startTime)?.label
      const et = times.find(t => t.id === resource.endTime)?.label
      const recordsLength = trainingQuery.data?.trainingRecords.filter(r => r.resource?._id === resource._id).length

      return `${name}, ${st} - ${et}, ${recordsLength} записей`
    },
    [trainingQuery]
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
        trainingQuery.data?.trainingResources.map(r => (
          <MenuItem value={r._id} key={r._id}>
            {getResouceLabel(r)}
          </MenuItem>
        ))
      }
    </Select>
  )
}
