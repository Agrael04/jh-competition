import React from 'react'

import { useSelector, useActions } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import PaymentForm from './payment-form'
import PaymentItem from './payment-item'

import useStyles from './styles'

export default function PaymentBlock() {
  const actions = useActions()
  const classes = useStyles()

  const isFormActive = useSelector(state => state.checkDialog.paymentForm.isActive)

  const { data } = useGetContactDetailsQuery()

  const openCreateForm = React.useCallback(
    () => {
      actions.checkDialog.openCreatePaymentForm()
    },
    [actions]
  )

  if (isFormActive) {
    return (
      <PaymentForm />
    )
  }

  return (
    <List className={classes.list}>
      <ListItem button={true} onClick={openCreateForm}>
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
          .map((payment, index) => (
            <PaymentItem
              payment={payment}
              index={index}
              key={payment._id}
            />
          ))
      }
    </List>
  )
}
