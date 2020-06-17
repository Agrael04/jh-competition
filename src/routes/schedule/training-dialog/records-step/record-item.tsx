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

import useGetTrainingQuery, { convertTrainingRecordToInput } from '../../queries/get-training'

import useDeleteTrainingRecord from '../../mutations/delete-training-record'

import removeTimeFromDate from 'utils/remove-time-from-date'

import useStyles from './styles'

interface IProps {
  id: string
}

export default function RecordItem({ id }: IProps) {
  const classes = useStyles()

  const actions = useActions()
  const { isActive, trainingForm } = useSelector(state => ({
    isActive: state.schedule.trainingDialog.recordForm?._id === id,
    trainingForm: state.schedule.trainingDialog.trainingForm,
  }))
  const trainingQuery = useGetTrainingQuery(trainingForm._id)
  const date = trainingQuery.data?.training.date!
  const record = trainingQuery?.data?.trainingRecords.find(r => r._id === id)

  const deleteTrainingRecord = useDeleteTrainingRecord()

  const activate = React.useCallback(
    () => actions.schedule.trainingDialog.openRecord(
      convertTrainingRecordToInput(record!)
    ),
    [actions, record]
  )

  const remove = React.useCallback(
    async () => {
      await deleteTrainingRecord(record)
    },
    [record, deleteTrainingRecord]
  )

  const trainingDate = new Date(date)?.getTime()
  const currentDate = removeTimeFromDate(new Date())?.getTime()!

  return (
    <ListItem button={true} onClick={activate} selected={isActive}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={record?.contact?.fullName}
        secondary={record?.attendant?.fullName}
      />
      {
        trainingDate > currentDate && (
          <ListItemSecondaryAction>
            <IconButton onClick={remove}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )
      }
    </ListItem>
  )
}
