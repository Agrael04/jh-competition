import React from 'react'
import moment from 'moment'
import { useSelector, IStoreState, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import useGetTrainingPassesQuery from '../../../graphql/get-training-passes'

import { passTypes, getSizes } from 'data/training-passes'

import { getUsedUnits, getExpirationDate } from 'utils/pass'

const selector = () => (state: IStoreState) => state.checkDialog.paymentForm?.pass?.link

export default function PassSelect() {
  const actions = useActions()
  const isDebt = useSelector(state => state.checkDialog.paymentForm?.isDebt)

  const { data } = useGetTrainingPassesQuery()

  const handleChange = React.useCallback(
    (name, pass) => {
      actions.checkDialog.updatePayment({ pass: { link: pass } })
    },
    [actions]
  )

  return (
    <Select
      name='pass'
      label='Абонимент'
      onChange={handleChange}
      fieldSelector={selector}
      fullWidth={true}
      variant='outlined'
      disabled={isDebt}
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
