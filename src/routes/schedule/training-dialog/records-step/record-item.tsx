import React from 'react'
import { useSelector, useActions } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import PersonIcon from '@material-ui/icons/Person'
import DeleteIcon from '@material-ui/icons/Delete'

import useDeleteTrainingRecord from '../../mutations/delete-training-record'

import useStyles from './styles'

interface IProps {
  id: string
}

export default function RecordItem({ id }: IProps) {
  const classes = useStyles()

  const actions = useActions()
  const { isActive, mode, record } = useSelector(state => ({
    mode: state.schedule.trainingDialog.mode,
    isActive: state.schedule.trainingDialog.recordForm?._id === id,
    record: state.schedule.trainingDialog.records.find(r => r._id === id)!,
  }))

  const deleteTrainingRecord = useDeleteTrainingRecord()

  const activate = React.useCallback(
    () => actions.schedule.trainingDialog.openRecord(id),
    [actions, id]
  )

  const remove = React.useCallback(
    async () => {
      if (mode === 'update') {
        await deleteTrainingRecord(record)
      }

      actions.schedule.trainingDialog.removeRecord(id)
    },
    [actions, record, id, deleteTrainingRecord, mode]
  )

  return (
    <ListItem button={true} onClick={activate} selected={isActive}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={record.contact?.fullName}
        secondary={record.attendant?.fullName}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={remove}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
