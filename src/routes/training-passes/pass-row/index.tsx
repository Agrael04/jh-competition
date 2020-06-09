import React from 'react'
import moment from 'moment'
import { useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'

import EditIcon from '@material-ui/icons/Edit'

import useStyles from '../styles'

import useGetTrainingPassesQuery from '../graphql/get-training-passes'
import useArchiveTrainingPass from '../graphql/archive-training-pass'
import { getUsedUnits, getExpirationDate } from 'utils/pass'

import IPassRow from './pass'

interface IProps {
  pass: IPassRow
}

const PassRow = ({ pass }: IProps) => {
  const classes = useStyles()
  const actions = useActions()
  const [open, setOpen] = React.useState(false)
  const [checked, setChecked] = React.useState<string[]>([])

  const { data } = useGetTrainingPassesQuery()
  const archiveTrainingPass = useArchiveTrainingPass()

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const toggle = () => setOpen(!open)

  const payments = data?.payments.filter(p => p.pass._id === pass._id) || []

  const remainingCapacity = pass.capacity - getUsedUnits(payments, pass)
  const expirationDate = getExpirationDate(payments, pass)

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    actions.passForm.open(
      'update',
      {
        _id: pass._id,
        contact: {
          link: pass.contact._id,
        },
        type: pass.type,
        size: pass.size,
        capacity: pass.capacity,
        duration: pass.duration,
        activation: pass.activation,
        price: pass.price,
        createdAt: pass.createdAt,
      }, pass.contact.fullName
    )
  }

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation()
    archiveTrainingPass(pass._id)
  }

  return (
    <>
      <TableRow onClick={toggle}>
        <TableCell>{pass.contact.fullName}</TableCell>
        <TableCell>{pass.type} {pass.size && pass.size}</TableCell>
        <TableCell>{pass.price} грн</TableCell>
        <TableCell className={(!remainingCapacity && pass.capacity > 0) ? classes.errorText : ''}>
          {
            pass.capacity > 0
              ? `${remainingCapacity} / ${pass.capacity} АБ`
              : '-'
          }
        </TableCell>
        <TableCell>
          {
            pass.capacity > 0
              ? `${pass.price / pass.capacity} грн`
              : '-'
          }
        </TableCell>
        <TableCell>{moment(pass.createdAt).format('D MMMM')}</TableCell>
        <TableCell className={expirationDate < new Date() ? classes.errorText : ''}>
          {moment(expirationDate).format('D MMMM')}
        </TableCell>
        <TableCell align='right'>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout='auto' unmountOnExit={true}>
            <Box marginX='auto' marginY={2} width={320}>
              <List>
                {payments.map((payment: any) => {
                  return (
                    <ListItem key={payment._id} button={true} onClick={handleToggle(payment._id)}>
                      <ListItemAvatar>
                        <Avatar>
                          {payment.amount}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={payment.gym.name} secondary={moment(new Date(payment.date)).format('D MMMM')} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          onChange={handleToggle(payment._id)}
                          checked={checked.indexOf(payment._id) !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
              <Grid container={true} justify='flex-end'>
                <Button color='secondary' variant='contained' disabled={checked.length < payments.length} onClick={handleArchive}>
                  Заархивировать
                </Button>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default PassRow
