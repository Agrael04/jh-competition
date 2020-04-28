import React from 'react'
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

import useStyles from './styles'

export default function ResourcesBlock() {
  const classes = useStyles()
  const actions = useActions()
  const trainingResources = useSelector(state => state.schedule.trainingDialog.resources)

  const activate = React.useCallback(
    async () => {
      actions.schedule.trainingDialog.openResource()
    },
    [actions]
  )

  return (
    <Grid container={true} spacing={3}>
      <Grid item={true} lg={4} className={classes.divider}>
        <List>
          <ListItem button={true} onClick={activate}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <AddOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Добавить`}
            />
          </ListItem>
          {
            trainingResources.map(tr => (
              <ResourceItem key={tr._id} id={tr._id!} />
            ))
          }
        </List>
      </Grid>
      <ResourceForm />
    </Grid>
  )
}