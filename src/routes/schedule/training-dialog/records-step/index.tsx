import React from 'react'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import RecordItem from './record-item'
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

  const getResouceLabel = React.useCallback(
    resource => {
      const name = resource?.resource?.name
      const st = times.find(t => t.id === resource.startTime)?.label
      const et = times.find(t => t.id === resource.endTime)?.label
      const recordsLength = trainingQuery.data?.trainingRecords.filter(tr => tr.resource._id === resource._id).length

      return `${name}, ${st} - ${et}, ${recordsLength} записей`
    },
    [trainingQuery]
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
              primary={`Добавить`}
            />
          </ListItem>
          {
            trainingQuery?.data?.trainingResources.map(r => (
              <React.Fragment key={r._id}>
                <ListSubheader disableSticky={true}>
                  {getResouceLabel(r)}
                </ListSubheader>
                {
                  trainingQuery?.data?.trainingRecords
                    .filter(record => record.resource._id === r._id)
                    .map(r => (
                      <RecordItem key={r._id} id={r._id!} />
                    ))
                }
              </React.Fragment>
            ))
          }
        </List>
      </Grid>
      <RecordForm />
    </Grid>
  )
}
