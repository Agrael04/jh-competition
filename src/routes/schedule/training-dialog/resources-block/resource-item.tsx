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
import useGetTrainingQuery, { convertTrainingResourceToInput } from '../../queries/get-training'

import useDeleteTrainingResource from '../../mutations/delete-training-resource'

import useStyles from './styles'

interface IProps {
  id: string
}

export default function ResourceItem({ id }: IProps) {
  const classes = useStyles()

  const actions = useActions()
  const { isActive, trainingForm } = useSelector(state => ({
    trainingForm: state.schedule.trainingDialog.trainingForm,
    isActive: state.schedule.trainingDialog.resourceForm?._id === id,
  }))
  const trainingQuery = useGetTrainingQuery(trainingForm._id)

  const resource = trainingQuery?.data?.trainingResources.find(r => r._id === id)

  const deleteTrainingResource = useDeleteTrainingResource()

  const activate = React.useCallback(
    () => actions.schedule.trainingDialog.openResource(
      convertTrainingResourceToInput(resource!)
    ),
    [actions, resource]
  )

  const remove = React.useCallback(
    async () => {
      await deleteTrainingResource(trainingForm, id)
    },
    [deleteTrainingResource, trainingForm, id]
  )

  const label = React.useMemo(
    () => {
      const st = times.find(t => t.id === resource?.startTime)?.label
      const et = times.find(t => t.id === resource?.endTime)?.label
      const trainer = resource?.trainer
      const trainerLabel = trainer ? `${trainer.firstName} ${trainer.lastName},` : ''

      return `${trainerLabel} ${st} - ${et}`
    },
    [resource]
  )

  return (
    <ListItem button={true} onClick={activate} selected={isActive}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <FitnessCenterIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={resource?.resource.name}
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
