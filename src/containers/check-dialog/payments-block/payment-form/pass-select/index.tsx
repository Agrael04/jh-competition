import React from 'react'
import { IStoreState, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import useGetContactDetailsQuery from '../../../graphql/get-contact-details'

import { universalSizes, noTrainerSizes, passTypes } from '../../../data'

const selector = () => (state: IStoreState) => state.checkDialog.paymentForm?.pass?.link

export default function PassSelect() {
  const actions = useActions()

  const { data } = useGetContactDetailsQuery()

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
            {pass.capacity} АБ
            {', '}
            {new Date(pass.expiresIn).toLocaleDateString()}
          </MenuItem>
        ))
      }
    </Select>
  )
}
