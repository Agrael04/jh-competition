import React, { useCallback } from 'react'
import moment from 'moment'

import { useActions, useSelector } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import useGetContactDetailsQuery from '../graphql/get-contact-details'
import useCreatePayment from '../graphql/create-payment'
import useUpdatePayment from '../graphql/update-payment'

import PaymentForm, { IPaymentForm } from './payment-form'
import PaymentItem from './payment-item'

import useStyles from './styles'

export default function PaymentBlock() {
  const classes = useStyles()
  const date = useSelector(state => state.checkDialog.params.activeDate)
  const contact = useSelector(state => state.checkDialog.params.contact)!
  const gym = useSelector(state => state.checkDialog.params.activeGym)

  const actions = useActions()
  const paymentForm = useSelector(state => state.checkDialog.paymentForm)

  const { data } = useGetContactDetailsQuery()
  const createPayment = useCreatePayment()
  const updatePayment = useUpdatePayment()

  const openCreateForm = useCallback(
    () => {
      actions.checkDialog.openPaymentForm(null, {
        type: 'units' as const,
      })
    },
    [actions]
  )

  const submit = useCallback(
    async (values: IPaymentForm) => {
      if (paymentForm._id) {
        await updatePayment(paymentForm._id, values)
      } else {
        await createPayment({
          contact,
          date: moment(date),
          gym: { link: gym },
          ...values,
        })
      }

      actions.checkDialog.closePaymentForm()
    }, [createPayment, updatePayment, actions, paymentForm, date, gym, contact]
  )

  if (paymentForm.active) {
    return (
      <PaymentForm
        defaultValues={paymentForm.defaultValues}
        submit={submit}
      />
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
              index={index}
              key={payment._id}
              id={payment._id}
            />
          ))
      }
    </List>
  )
}
