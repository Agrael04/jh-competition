import React from 'react'
import { useSelector, IStoreState, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import useGetTrainingPassesQuery from '../../../graphql/get-training-passes'

import { universalSizes, noTrainerSizes, passTypes } from '../../../data'

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

  const getUsedUnits = (_id: string) => {
    return data?.payments.filter(p => p.pass?._id === _id).reduce((res, a) => res + a.amount, 0)!
  }

  const getFirstDate = (_id: string) => {
    return data?.payments.map(p => new Date(p.date).getDate()).sort((a, b) => a - b)[0]!
  }

  const getActivationDate = (pass: any) => {
    const maxActivationDate = new Date(pass.createdAt).getDate() + pass.activation
    const firstDate = getFirstDate(pass._id)

    return maxActivationDate > firstDate ? firstDate : maxActivationDate
  }

  const getExpirationDate = (pass: any) => {
    const activationDate = getActivationDate(pass)

    const date = new Date()
    date.setDate(activationDate + pass.duration)

    return date
  }

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
              pass.type === 'universal' && (
                <>
                  {' '}
                  {universalSizes.find(s => s.value === pass.size)?.value}
                </>
              )
            }
            {
              pass.type === 'no_trainer' && (
                <>
                  {' '}
                  {noTrainerSizes.find(s => s.value === pass.size)?.text}
                </>
              )
            }
            {', '}
            {
              pass.capacity - getUsedUnits(pass._id)
            } АБ
            {', '}
            {
              getExpirationDate(pass).toLocaleDateString()
            }
          </MenuItem>
        ))
      }
    </Select>
  )
}
