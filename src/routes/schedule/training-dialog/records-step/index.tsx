import React from 'react'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import RecordItem from './record-item'
import RecordForm from './record-form'

import useStyles from './styles'

export default function ResourcesBlock() {
  const classes = useStyles()
  const actions = useActions()
  const records = useSelector(state => state.schedule.trainingDialog.records)

  const activate = React.useCallback(
    async () => {
      actions.schedule.trainingDialog.openRecord()
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
            records.map(r => (
              <RecordItem key={r._id} id={r._id!} />
            ))
          }
        </List>
      </Grid>
      <RecordForm />
      {/* {
        trainingResources.map(resource => (
          <Grid item={true} lg={12} container={true} spacing={1} key={resource._id}>
            <Grid item={true}>
              <ResourceChip id={resource._id} />
            </Grid>
            {
              resource.records.link.map(r => (
                <Grid item={true} key={r}>
                  <RecordChip id={r} />
                </Grid>
              ))
            }
            <Grid item={true}>
              <AddRecordChip />
            </Grid>
          </Grid>
        ))
      }
      <ResourceLine /> */}
    </Grid>
  )
}
