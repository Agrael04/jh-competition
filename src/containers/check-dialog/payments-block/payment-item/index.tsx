import React from 'react'

import { useActions } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import useDeletePayment from '../../graphql/delete-payment'

import useStyles from '../styles'

import IPayment from './payment'

interface IProps {
  payment: IPayment
  index: number
}

export default function PaymentItem({ payment, index }: IProps) {
  const classes = useStyles()

  const actions = useActions()
  const setPayment = actions.checkDialog.setPayment

  const deletePayment = useDeletePayment()

  const openEditForm = React.useCallback(
    () => {
      const p = {
        _id: payment._id,
        type: payment.type,
        pass: payment.pass ? { link: payment.pass._id } : undefined,
        amount: payment.amount,
        destination: payment.destination,
        transaction: payment.transaction,
      }

      setPayment(p, 'update')
    },
    [setPayment, payment]
  )

  const removePayment = React.useCallback(
    () => deletePayment(payment._id),
    [deletePayment, payment]
  )

  return (
    <ListItem button={true} key={payment._id} onClick={openEditForm}>
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
