import React from 'react'
import { useSelector, useActions } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import DeleteIcon from '@material-ui/icons/Delete'

import times from 'data/times'
import useGetGymsQuery from '../../queries/get-gyms'

import useDeleteTrainingResource from '../../mutations/delete-training-resource'

import useStyles from './styles'

interface IProps {
  id: string
}

export default function ResourceItem({ id }: IProps) {
  const classes = useStyles()

  const actions = useActions()
  const { isActive, trainingForm, mode, resource } = useSelector(state => ({
    trainingForm: state.schedule.trainingDialog.trainingForm,
    mode: state.schedule.trainingDialog.mode,
    isActive: state.schedule.trainingDialog.resourceForm?._id === id,
    resource: state.schedule.trainingDialog.resources.find(r => r._id === id)!,
  }))
  const { data } = useGetGymsQuery()

  const deleteTrainingResource = useDeleteTrainingResource()

  const activate = React.useCallback(
    () => actions.schedule.trainingDialog.openResource(id),
    [actions, id]
  )

  const remove = React.useCallback(
    async () => {
      if (mode === 'update') {
        await deleteTrainingResource(trainingForm, id)
      }

      actions.schedule.trainingDialog.removeResource(id)
    },
    [actions, id, deleteTrainingResource, mode, trainingForm]
  )

  const label = React.useMemo(
    () => {
      const st = times.find(t => t.id === resource.startTime)?.label
      const et = times.find(t => t.id === resource.endTime)?.label

      return `${st} - ${et}, ${resource.records.link.length} записей`
    },
    [resource]
  )

  const name = React.useMemo(
    () => data?.resources.find(r => r._id === resource.resource.link)?.name,
    [resource, data]
  )

  return (
    <ListItem button={true} onClick={activate} selected={isActive}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <FitnessCenterIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={label}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={remove}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
