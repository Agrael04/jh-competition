import React from 'react'
import { useSelector, useActions } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import useGetContactDetailsQuery from '../graphql/get-contract-details'

import PaymentForm from './payment-form'
import PaymentItem from './payment-item'

import useStyles from './styles'

export default function PaymentBlock() {
  const classes = useStyles()
  const isFormActive = useSelector(state => !!state.checkDialog.paymentForm)

  const { data } = useGetContactDetailsQuery()

  const actions = useActions()

  const openAddForm = React.useCallback(
    () => actions.checkDialog.openPayment(),
    [actions]
  )

  if (isFormActive) {
    return (
      <PaymentForm />
    )
  }

  return (
    <List className={classes.list}>
      <ListItem button={true} onClick={openAddForm}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <AddOutlined />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`Добавить оплату`}
        />
      </ListItem>
      {
        data?.payments
          .filter(payment => payment.isDebt)
          .map((payment, index) => (
            <PaymentItem payment={payment} index={index} key={payment._id} />
          ))
      }
      {
        data?.payments
          .filter(payment => !payment.isDebt)
          .map((payment, index) => (
            <PaymentItem payment={payment} index={index} key={payment._id} />
          ))
      }
    </List>
  )
}
