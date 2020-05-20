import React from 'react'
import { useSelector, useActions } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import PaymentForm from './payment-form'

const payments = [
  {
    paymentDate: new Date(),
    priceMoney: 400,
    priceUnits: 2,
    paymentMethod: 'units',
    _id: 'Transaction 123312',
  },
  {
    paymentDate: new Date(),
    priceMoney: 400,
    priceUnits: 2,
    paymentMethod: 'money',
    _id: 'Transaction 12331212',
  },
  {
    paymentDate: new Date(),
    priceMoney: 400,
    priceUnits: 3,
    paymentMethod: 'units',
    _id: 'Transaction 1233124',
  },
  {
    paymentDate: new Date(),
    priceMoney: 600,
    priceUnits: 2,
    paymentMethod: 'money',
    _id: 'Transaction 1233123',
  },
]

export default function PaymentBlock() {
  const { activeDate, activeGym, contact } = useSelector(state => ({
    activeDate: state.schedule.page.activeDate,
    activeGym: state.schedule.page.activeGym,
    contact: state.checkDialog.contact,
  }))
  const isFormActive = useSelector(state => !!state.checkDialog.paymentForm)

  const { data } = useGetContactDetailsQuery(activeDate, activeGym, contact)

  const actions = useActions()

  const openAddPassForm = React.useCallback(
    () => actions.checkDialog.openPayment(),
    [actions]
  )

  if (isFormActive) {
    return (
      <PaymentForm />
    )
  }

  return (
    <List>
      {
        payments.map((payment, index) => (
          <ListItem button={true} key={payment._id} onClick={openAddPassForm}>
            <ListItemAvatar>
              <Avatar>
                {index + 1}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${payment.paymentMethod === 'units' ? `${payment.priceUnits} АБ` : `${payment.priceMoney} грн`}, ${payment.paymentDate.toDateString()}`}
              secondary={payment._id}
            />
          </ListItem>
        ))
      }
    </List>
  )
}
