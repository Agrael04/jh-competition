import { useCallback } from 'react'
import { useSelector, useDispatch } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import PersonIcon from '@material-ui/icons/Person'
import EditIcon from '@material-ui/icons/Edit'

import { openCheckDialog } from 'store/ui/pages/schedule/training-dialog/actions'
import { openUpdateRecordForm } from 'store/ui/pages/schedule/training-dialog/actions'
import { selectRecordFormId, selectTrainingId } from 'store/ui/pages/schedule/training-dialog/selectors'

import { useReadTrainingResourceById } from '../../queries/get-training-resource'

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
  const readTraining = useReadTrainingResourceById()
  const training = readTraining(_id)

  const record = training?.trainingRecords?.find(r => r._id === id)

  const isActive = recordId === id

  const openCheck = () => {
    if (record) {
      dispatch(openCheckDialog(record?.contact._id))
    }
  }
  
  const activate = useCallback(
    () => {
      if (!record) {
        return
      }

      const initialForm = {
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

  return (
    <ListItem button={true} onClick={openCheck} selected={isActive}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={getClientLabel(record?.contact)}
        secondary={getClientLabel(record?.attendant)}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={activate}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
