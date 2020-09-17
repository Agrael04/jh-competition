import React, { useState, useMemo, useCallback } from 'react'
import moment from 'moment'

import { useSelector } from 'store'

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

interface IFormState {
  active: boolean
  _id: string | null
}

export default function PaymentBlock() {
  const classes = useStyles()
  const date = useSelector(state => state.checkDialog.params.activeDate)

  const [form, setForm] = useState<IFormState>({ active: false, _id: null })

  const { data } = useGetContactDetailsQuery()
  const createPayment = useCreatePayment()
  const updatePayment = useUpdatePayment()

  const openCreateForm = useCallback(
    () => {
      setForm({ active: true, _id: null })
    },
    [setForm]
  )

  const openUpdateForm = useCallback(
    (_id: string) => {
      setForm({ active: true, _id })
    },
    [setForm]
  )

  const closeForm = useCallback(
    () => {
      setForm({ active: false, _id: null })
    }, [setForm]
  )

  const submit = useCallback(
    async (values: IPaymentForm) => {
      if (form._id) {
        await updatePayment(form._id, values)
      } else {
        await createPayment(values)
      }

      closeForm()
    }, [createPayment, updatePayment, closeForm, form]
  )

  const defaultValues = useMemo(
    () => {
      if (!form.active) {
        return {}
      }

      if (!form._id) {
        return {
          type: 'units' as const,
          createdAt: moment(date).toDate(),
        }
      }

      const payment = data?.payments.find(p => p._id === form._id)!

      return {
        ...payment,
        pass: payment.pass ? { link: payment.pass._id } : undefined,
      }
    },
    [data, form, date]
  )

  if (form.active) {
    return (
      <PaymentForm
        defaultValues={defaultValues}
        close={closeForm}
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
              payment={payment}
              index={index}
              openForm={openUpdateForm}
              key={payment._id}
            />
          ))
      }
    </List>
  )
}
