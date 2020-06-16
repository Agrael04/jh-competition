import React from 'react'
import { useActions } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import useDeleteCheckPosition from '../../graphql/delete-check-position'

import IPosition from './position'

import { products } from '../../data'

interface IProps {
  position: IPosition
  index: number
}

export default function PaymentItem({ position, index }: IProps) {
  const actions = useActions()
  const deleteCheckPosition = useDeleteCheckPosition()

  const openEditForm = React.useCallback(
    () => actions.checkDialog.openPosition({
      _id: position._id,
      priceType: position.priceType || 'money',
      priceAmount: position.priceAmount,
      type: position.type,
      service: position.service,
    }),
    [actions, position]
  )

  const product = products.find(p => p.id === position.type)
  const service: any = product?.options.find(o => o.id === position.service)

  const removeCheckPosition = React.useCallback(
    () => deleteCheckPosition(position._id),
    [deleteCheckPosition, position]
  )

  return (
    <ListItem button={true} key={position._id} onClick={openEditForm}>
      <ListItemAvatar>
        <Avatar>
          {index + 1}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${service?.name}`}
        secondary={position.priceAmount ? `${position.priceAmount} ${position.priceType === 'units' ? 'АБ' : 'грн'}` : null}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={removeCheckPosition}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
