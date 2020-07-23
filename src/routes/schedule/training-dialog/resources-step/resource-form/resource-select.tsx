import React from 'react'
import { useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'
import Select from 'components/select'

import useGetGymsQuery from '../../../queries/get-gyms'

interface IProps {
  value: { link: string } | null | undefined
  onChange: (value: any) => void
  error?: any
}

export default function ResourceSelect({ value, onChange, error }: IProps) {
  const { gym } = useSelector(state => ({
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
  }))
  const gyms = useGetGymsQuery()

  const resources = React.useMemo(
    () => {
      return gyms.data?.resources.filter(r => r.gym._id === gym) || []
    }, [gyms, gym]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ link: e.target.value })
  }

  if (resources.length === 0) {
    return (
      <div />
    )
  }

  return (
    <Select
      value={value ? value.link : null}
      onChange={handleChange}
      label={'Ресурс'}
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
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
