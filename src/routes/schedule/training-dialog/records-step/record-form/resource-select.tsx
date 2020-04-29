import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import times from 'data/times'
import useGetGymsQuery from '../../../queries/get-gyms'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.schedule.trainingDialog.recordForm?.resource?.link

export default function RecordSelect({ name, label }: IProps) {
  const actions = useActions()
  const { resources, records } = useSelector(state => ({
    resources: state.schedule.trainingDialog.resources,
    records: state.schedule.trainingDialog.records,
  }))
  const { data } = useGetGymsQuery()

  const handleChange = React.useCallback(
    (name, link: string) => {
      actions.schedule.trainingDialog.updateRecordField(name, { link })
    },
    [actions]
  )

  const getResouceLabel = React.useCallback(
    resource => {
      const name = data?.resources.find(r => r._id === resource.resource.link)?.name
      const st = times.find(t => t.id === resource.startTime)?.label
      const et = times.find(t => t.id === resource.endTime)?.label
      const recordsLength = records.filter(r => r.resource.link === resource._id).length

      return `${name}, ${st} - ${et}, ${recordsLength} записей`
    },
    [data, records]
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
        resources.map(r => (
          <MenuItem value={r._id} key={r._id}>
            {getResouceLabel(r)}
          </MenuItem>
        ))
      }
    </Select>
  )
}
