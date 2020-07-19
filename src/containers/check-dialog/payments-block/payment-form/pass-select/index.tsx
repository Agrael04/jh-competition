import React from 'react'
import moment from 'moment'

import { useFormContext } from 'react-hook-form'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import useGetTrainingPassesQuery from '../../../graphql/get-training-passes'

import { passTypes, getSizes } from 'data/training-passes'

import { getUsedUnits, getExpirationDate } from 'utils/pass'

interface IProps {
  value?: { link: string }
  onChange: (value: { link: string }) => void
}

export default function PassSelect({ onChange, value }: IProps) {
  const { data } = useGetTrainingPassesQuery()
  const { errors } = useFormContext()
  const error = errors.pass

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ link: e.target.value })
    },
    [onChange]
  )

  return (
    <Select
      name='pass'
      label='Абонимент'
      value={value ? value.link : undefined}
      onChange={handleChange}
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    >
      {
        data?.trainingPasss.map(pass => (
          <MenuItem value={pass._id} key={pass._id}>
            {passTypes.find(p => p.value === pass.type)?.text}
            {
              !!(getSizes(pass.type)) && (
                <>
                  {' '}
                  {getSizes(pass.type)?.find(s => s.value === pass.size)?.text}
                </>
              )
            }
            {', '}
            {
              pass.capacity - getUsedUnits(data?.payments, pass)
            } АБ
            {', '}
            {
              moment(getExpirationDate(data?.payments, pass)).format('D MMMM')
            }
          </MenuItem>
        ))
      }
    </Select>
  )
}
