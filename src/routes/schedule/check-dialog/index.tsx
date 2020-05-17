import React from 'react'
import { useSelector, useActions } from 'store'

import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import useGetContactDetailsQuery from '../queries/get-contact-details'

import RecordForm from './record-form'
import PaymentForm from './payment-form'
import PassForm from './pass-form'

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
    _id: 'Transaction 123312',
  },
  {
    paymentDate: new Date(),
    priceMoney: 400,
    priceUnits: 3,
    paymentMethod: 'units',
    _id: 'Transaction 123312',
  },
  {
    paymentDate: new Date(),
    priceMoney: 600,
    priceUnits: 2,
    paymentMethod: 'money',
    _id: 'Transaction 123312',
  },
]

export default function TrainingDialog() {
  const { activeDate, activeGym, opened, contact } = useSelector(state => ({
    activeDate: state.schedule.page.activeDate,
    activeGym: state.schedule.page.activeGym,
    opened: state.schedule.checkDialog.opened,
    contact: state.schedule.checkDialog.contact,
  }))

  const { data } = useGetContactDetailsQuery(activeDate, activeGym, contact)

  const [openedRecordForm, setOpenedRecordForm] = React.useState(false)
  const [openedTransactionForm, setOpenedTransactionForm] = React.useState(false)

  const actions = useActions()

  const close = React.useCallback(
    () => actions.schedule.checkDialog.close(),
    [actions]
  )

  const openRecordForm = () => {
    setOpenedRecordForm(true)
  }

  const closeRecordForm = () => {
    setOpenedRecordForm(false)
  }

  const openTransactionForm = () => {
    setOpenedTransactionForm(true)
  }

  const closeTransactionForm = () => {
    setOpenedTransactionForm(false)
  }

  return (
    <Dialog open={opened} onClose={close} maxWidth='lg' fullWidth={true}>
      <AppBar position='relative'>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={close} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6'>
            Чек: {data?.user.fullName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box padding={3}>
        <Grid container={true} spacing={3}>
          <Grid item={true} lg={4} container={true} justify='space-between' direction='column'>
            {
              openedRecordForm
                ? (
                  <RecordForm cancel={closeRecordForm} />
                ) : (
                  <div>
                    <List>
                      {
                        data?.trainingRecords.map((record, index) => (
                          <ListItem button={true} key={record._id} onClick={openRecordForm}>
                            <ListItemAvatar>
                              <Avatar>
                                {index + 1}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${record.training.type} (${record.training.name}), 8:00 - 9:00`}
                              secondary={index % 2 === 0 ? `600 грн` : '3АБ'}
                            />
                          </ListItem>
                        ))
                      }
                    </List>
                  </div>
                )
            }
          </Grid>
          <Grid item={true} lg={4}>
            {
              openedTransactionForm
                ? (
                  <PaymentForm cancel={closeTransactionForm} />
                ) : (
                  <List>
                    {
                      payments.map((payment, index) => (
                        <ListItem button={true} key={payment._id} onClick={openTransactionForm}>
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
          </Grid>
          <Grid item={true} lg={4}>
            <PassForm />
          </Grid>
          <Grid item={true} lg={12}>
            <Box border={1} borderColor='primary.main' width={1} />
          </Grid>
          <Grid item={true} lg={4} container={true} direction='column' justify='space-between'>
            <Grid item={true}>
              <Box margin='auto' width='fit-content'>
                <Typography variant='h5' color='primary' align='center'>
                  Всего заказано
                </Typography>
                <Typography variant='h6' align='center'>
                  -1200 грн
                </Typography>
                <Typography variant='h6' align='center'>
                  -6 АБ
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item={true} lg={4} container={true} direction='column' justify='space-between'>
            <Grid item={true}>
              <Box margin='auto' width='fit-content'>
                <Typography variant='h5' color='primary' align='center'>
                  Всего поступило
                </Typography>
                <Typography variant='h6' align='center'>
                  +1000 грн
                </Typography>
                <Typography variant='h6' align='center'>
                  +5 АБ
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item={true} lg={4} container={true} direction='column' justify='space-between'>
            <Grid item={true}>
              <Box margin='auto' width='fit-content'>
                <Typography variant='h5' color='primary' align='center'>
                  Баланс
                </Typography>
                <Typography variant='h6' align='center'>
                  -200 грн
                </Typography>
                <Typography variant='h6' align='center'>
                  -1 АБ
                </Typography>
              </Box>
            </Grid>
            <Grid item={true} container={true}>
              <Box marginTop={3} width={1}>
                <Button color='primary' variant='contained' fullWidth={true}>
                  Закрыть чек
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
