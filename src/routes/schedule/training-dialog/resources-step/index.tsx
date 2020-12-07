import { useCallback } from 'react'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import ResourceItem from './resource-item'
import ResourceForm from './resource-form'

import useGetTrainingQuery from '../../queries/get-training'
// import { trainingTypes } from 'data/training-types'

import useStyles from './styles'

export default function ResourcesBlock() {
  const classes = useStyles()
  const actions = useActions()
  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)
  const isFormActive = useSelector(state => state.schedule.trainingDialog.resourceForm.isActive)

  const activate = useCallback(
    async () => {
      actions.schedule.trainingDialog.openCreateResourceForm()
    },
    [actions]
  )

  // const type = trainingQuery.data?.training.type
  // const hasResourceLimit = trainingTypes.find(t => t.id === type)?.hasResourceLimit
  // const disabled = hasResourceLimit && (trainingQuery.data?.trainingResources?.length || 0) > 0

  return (
    <Grid container={true} spacing={3}>
      <Grid item={true} lg={4} className={classes.divider}>
        <List>
          <ListItem button={true} onClick={activate} disabled={true}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <AddOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='Добавить ресурс'
            />
          </ListItem>
          {
            trainingQuery.data?.trainingResources.map(tr => (
              <ResourceItem key={tr._id} id={tr._id!} />
            ))
          }
        </List>
      </Grid>
      {
        isFormActive && (
          <ResourceForm />
        )
      }
    </Grid>
  )
}
