import React from 'react'
import moment from 'moment'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import useGetTrainingPassesQuery from '../../../graphql/get-training-passes'

import { passTypes, getSizes } from 'data/training-passes'

import { getUsedUnits, getExpirationDate } from 'utils/pass'

import { useContext } from '../../../context'

export default function PassSelect() {
  const { pass, update } = useContext(s => ({
    pass: s.state.paymentForm?.pass?.link,
    update: s.actions.updatePayment,
  }))

  const { data } = useGetTrainingPassesQuery()

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update({ pass: { link: e.target.value } })
    },
    [update]
  )

  return (
    <Select
      name='pass'
      label='Абонимент'
      value={pass}
      onChange={handleChange}
      fullWidth={true}
      variant='outlined'
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
