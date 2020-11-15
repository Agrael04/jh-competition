import React from 'react'
import { useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'
import Select, { ISelectProps } from 'components/select'

import useGetGymsQuery from '../../../queries/get-gyms'
import useGetTrainingQuery from '../../../queries/get-training'

type IProps = ISelectProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
  linked?: boolean
}

export default function ResourceSelect(props: IProps) {
  const { value, error, onChange } = props
  const _id = useSelector(state => state.schedule.trainingDialog._id)

  const trainingQuery = useGetTrainingQuery(_id!)
  const training = trainingQuery.data?.training

  const gyms = useGetGymsQuery()

  const resources = React.useMemo(
    () => {
      return gyms.data?.resources.filter(r => r.gym._id === training?.gym._id) || []
    }, [gyms, training]
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
      helperText={error?.message || props.helperText}
      disabled={true}
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
