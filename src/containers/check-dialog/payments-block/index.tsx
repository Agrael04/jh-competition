import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import PaymentForm from './payment-form'
import PaymentItem from './payment-item'

import { useContext } from '../context'

import removeTimeFromDate from 'utils/remove-time-from-date'

import useStyles from './styles'

const currentDate = removeTimeFromDate(new Date())!

export default function PaymentBlock() {
  const classes = useStyles()

  const { contact, gym, date, isFormActive, setPayment } = useContext(s => ({
    date: s.state?.params.activeDate,
    gym: s.state?.params.activeGym,
    contact: s.state?.params.contact?.link,
    isFormActive: !!s.state.paymentForm,
    setPayment: s.actions.setPayment,
  }))

  const { data } = useGetContactDetailsQuery()

  const openAddForm = React.useCallback(
    () => {
      const p = {
        contact: { link: contact! },
        gym: { link: gym },
        date,
        createdAt: currentDate,
        type: 'units' as const,
        amount: null,
      }

      setPayment(p, 'create')
    },
    [setPayment, contact, date, gym]
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
          .map((payment, index) => (
            <PaymentItem payment={payment} index={index} key={payment._id} />
          ))
      }
    </List>
  )
}
