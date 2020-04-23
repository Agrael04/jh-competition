import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.schedule.trainingDialog.resourceForm?.records.link

export default function RecordSelect({ name, label }: IProps) {
  const actions = useActions()
  const { records } = useSelector(state => ({
    records: state.schedule.trainingDialog.records,
  }))

  const handleChange = React.useCallback(
    (name, link: string[]) => {
      actions.schedule.trainingDialog.updateResourceField(name, { link })
    },
    [actions]
  )

  return (
    <Select
      name={name}
      onChange={handleChange}
      fieldSelector={selector}
      label={label}
      fullWidth={true}
      variant='outlined'
      multiple={true}
    >
      {
        records.map(r => (
          <MenuItem value={r._id} key={r._id}>
            {r.contact.fullName}
          </MenuItem>
        ))
      }
    </Select>
  )
}
