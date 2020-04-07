import React from 'react'
import { IStoreState, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'
import useGetGymsQuery from '../../queries/get-gyms'

interface IProps {
  name: string
  label: string
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange: (name: any, value: any) => void
}

export default function ResourceSelect({ name, label, onChange, fieldSelector }: IProps) {
  const gym = useSelector(fieldSelector('gym')) as string
  const gyms = useGetGymsQuery()

  const resources = React.useMemo(
    () => {
      return gyms.data?.resources.filter(r => r.gym._id === gym) || []
    }, [gyms, gym]
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
        resources.map(r => (
          <MenuItem value={r._id} key={r._id}>
            {r.name}
          </MenuItem>
        ))
      }
    </Select>
  )
}
