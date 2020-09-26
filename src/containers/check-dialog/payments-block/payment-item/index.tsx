import React, { useMemo } from 'react'

import { useActions } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import useGetContactDetailsQuery from '../../graphql/get-contact-details'
import useDeletePayment from '../../graphql/delete-payment'

import useStyles from '../styles'

interface IProps {
  index: number
  id: string
}

export default function PaymentItem({ index, id }: IProps) {
  const classes = useStyles()
  const actions = useActions()
  const { data } = useGetContactDetailsQuery()

  const payment = useMemo(
    () => {
      return data?.payments.find(p => p._id === id)!
    }, [data, id]
  )

  const deletePayment = useDeletePayment()

  const openUpdateForm = React.useCallback(
    () => {
      actions.checkDialog.openPaymentForm(payment._id, {
        ...payment,
        pass: payment.pass ? {
          link: payment.pass._id,
        } : undefined,
      })
    },
    [actions, payment]
  )

  const removePayment = React.useCallback(
    () => deletePayment(payment._id),
    [deletePayment, payment]
  )

  return (
    <ListItem button={true} key={payment._id} onClick={openUpdateForm}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          {index + 1}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${payment.amount} ${payment.type === 'units' ? `АБ` : `грн`}, ${new Date(payment.createdAt).toDateString()}`}
        secondary={payment._id}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={removePayment}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
