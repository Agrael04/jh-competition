import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import { getTimeLabel } from 'data/times'

import { openUpdateResourceForm } from 'store/ui/pages/schedule/training-dialog/actions'

import { selectResourceFormId, selectTrainingId } from 'store/ui/pages/schedule/training-dialog/selectors'

import useGetTrainingQuery from '../../queries/get-training'

import useDeleteTrainingResource from '../../mutations/delete-training-resource'

import useStyles from './styles'

interface IProps {
  id: string
}

export default function ResourceItem({ id }: IProps) {
  const classes = useStyles()

  const dispatch = useDispatch()
  const resourceId = useSelector(selectResourceFormId)
  const _id = useSelector(selectTrainingId)
  const trainingQuery = useGetTrainingQuery(_id)

  const resource = trainingQuery?.data?.trainingResources.find(r => r._id === id)

  const deleteTrainingResource = useDeleteTrainingResource()
  const isActive = resourceId === id

  const activate = useCallback(
    () => {
      if (!resource) {
        return
      }

      const initialForm = {
        resource: { link: resource.resource._id },
        trainer: resource.trainer ? { link: resource.trainer._id } : undefined,
        startTime: resource.startTime,
        endTime: resource.endTime,
      }

      dispatch(openUpdateResourceForm(
        resource._id,
        initialForm
      ))
    },
    [resource]
  )

  const remove = useCallback(
    async () => {
      await deleteTrainingResource(id)
    },
    [deleteTrainingResource, id]
  )

  const primaryLabel = useMemo(
    () => {
      const st = getTimeLabel(resource?.startTime)
      const et = getTimeLabel(resource?.endTime)

      return `${resource?.resource.name}, ${st} - ${et}`
    },
    [resource]
  )

  const secondaryLabel = useMemo(
    () => {
      const trainer = resource?.trainer
      const trainerLabel = trainer ? `${trainer.firstName} ${trainer.lastName}` : ''

      return `${trainerLabel}`
    },
    [resource]
  )

  return (
    <ListItem button={true} onClick={activate} selected={isActive}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          {trainingQuery?.data?.trainingRecords.filter(record => record.resource?._id === id).length}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={primaryLabel}
        secondary={secondaryLabel}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={remove}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
