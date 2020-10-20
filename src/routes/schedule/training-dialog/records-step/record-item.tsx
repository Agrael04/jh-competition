import React from 'react'
import moment from 'moment'
import { useSelector, useActions } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import PersonIcon from '@material-ui/icons/Person'
import DeleteIcon from '@material-ui/icons/Delete'

import useGetTrainingQuery from '../../queries/get-training'

import useDeleteTrainingRecord from '../../mutations/delete-training-record'

import getClientLabel from 'utils/get-client-label'

import useStyles from './styles'

interface IProps {
  id: string
}

export default function RecordItem({ id }: IProps) {
  const classes = useStyles()

  const actions = useActions()
  const { isActive, _id } = useSelector(state => ({
    isActive: state.schedule.trainingDialog.recordForm._id === id,
    _id: state.schedule.trainingDialog._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)
  const date = trainingQuery.data?.training.date!
  const record = trainingQuery?.data?.trainingRecords.find(r => r._id === id)

  const deleteTrainingRecord = useDeleteTrainingRecord()

  const activate = React.useCallback(
    () => {
      if (!record) {
        return
      }

      const initialForm = {
        resource: { link: record.resource._id },
        status: record.status,
        note: record.note,
        contact: { link: record.contact._id },
        attendant: record.attendant ? {
          link: record.attendant._id,
        } : undefined,
      }

      actions.schedule.trainingDialog.openUpdateRecordForm(
        record._id,
        initialForm
      )
    },
    [actions, record]
  )

  const remove = React.useCallback(
    async () => {
      await deleteTrainingRecord(record)
    },
    [record, deleteTrainingRecord]
  )

  return (
    <ListItem button={true} onClick={activate} selected={isActive}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={getClientLabel(record?.contact)}
        secondary={getClientLabel(record?.attendant)}
      />
      {
        moment(date).diff(moment()) > 0 && (
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
