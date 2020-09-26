import React, { useCallback, useMemo } from 'react'

import { useActions } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import useGetContactDetailsQuery from '../../graphql/get-contact-details'
import useDeleteCheckPosition from '../../graphql/delete-check-position'

import { products } from '../../data'

interface IProps {
  id: string
  index: number
}

export default function PositionItem({ index, id }: IProps) {
  const actions = useActions()
  const { data } = useGetContactDetailsQuery()
  const deleteCheckPosition = useDeleteCheckPosition()

  const position = useMemo(
    () => {
      return data?.checkPositions.find(p => p._id === id)!
    }, [data, id]
  )

  const openUpdateForm = useCallback(
    () => {
      actions.checkDialog.openPositionForm(position._id, position)
    },
    [actions, position]
  )

  const product = products.find(p => p.id === position.type)
  const service: any = product?.options.find(o => o.id === position.service)

  const removeCheckPosition = useCallback(
    () => deleteCheckPosition(position._id),
    [deleteCheckPosition, position]
  )

  return (
    <ListItem button={true} key={position._id} onClick={openUpdateForm}>
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
