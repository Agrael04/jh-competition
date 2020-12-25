import { useCallback } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import PersonIcon from '@material-ui/icons/Person'
import DeleteIcon from '@material-ui/icons/Delete'

import { openUpdateRecordForm } from 'store/ui/pages/schedule/training-dialog/actions'
import { selectRecordFormId, selectTrainingId } from 'store/ui/pages/schedule/training-dialog/selectors'

import useGetTrainingQuery from '../../queries/get-training'

import useDeleteTrainingRecord from '../../mutations/delete-training-record'

import getClientLabel from 'utils/get-client-label'

import useStyles from './styles'

interface IProps {
  id: string
}

export default function RecordItem({ id }: IProps) {
  const classes = useStyles()

  const dispatch = useDispatch()
  const recordId = useSelector(selectRecordFormId)
  const _id = useSelector(selectTrainingId)
  const trainingQuery = useGetTrainingQuery(_id)
  const date = trainingQuery.data?.training.date!
  const record = trainingQuery?.data?.trainingRecords.find(r => r._id === id)

  const deleteTrainingRecord = useDeleteTrainingRecord()
  const isActive = recordId === id

  const activate = useCallback(
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

      dispatch(openUpdateRecordForm(
        record._id,
        initialForm
      ))
    },
    [record]
  )

  const remove = useCallback(
    async () => {
      if (!record) {
        return
      }

      await deleteTrainingRecord(record?._id, record?.resource._id)
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
