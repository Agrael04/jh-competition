import React from 'react'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

import AddOutlined from '@material-ui/icons/AddOutlined'

import RecordItem from './record-item'
import ResourceItem from './resource-item'
import RecordForm from './record-form'

import times from 'data/times'
import useGetTrainingQuery from '../../queries/get-training'

import useStyles from './styles'

export default function ResourcesBlock() {
  const classes = useStyles()
  const actions = useActions()
  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)

  const activate = React.useCallback(
    async () => {
      actions.schedule.trainingDialog.openRecord()
    },
    [actions]
  )

  return (
    <Grid container={true} spacing={3}>
      <Grid item={true} lg={4} className={classes.divider}>
        <List className={classes.list}>
          <ListItem button={true} onClick={activate}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <AddOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Добавить запись`}
            />
          </ListItem>
          {
            trainingQuery?.data?.trainingResources.map(r => (
              <ResourceItem id={r._id!} key={r._id} />
            ))
          }
        </List>
      </Grid>
      <RecordForm />
    </Grid>
  )
}
