import { useDispatch, useSelector } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import { openCreatePaymentForm } from 'store/ui/dialogs/check-dialog/actions'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import PaymentForm from './payment-form'
import PaymentItem from './payment-item'

import useStyles from './styles'

export default function PaymentBlock() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const paymentForm = useSelector(state => state.ui.dialogs.checkDialog.paymentForm)

  const { data } = useGetContactDetailsQuery()

  const openCreateForm = () => {
    dispatch(openCreatePaymentForm({
      type: 'units' as const,
    }))
  }

  if (paymentForm.isActive) {
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
          primary='Добавить оплату'
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
