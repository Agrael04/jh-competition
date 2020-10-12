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

import useGetTrainingQuery from '../../queries/get-training'

import useStyles from './styles'

export default function ResourcesBlock() {
  const classes = useStyles()
  const actions = useActions()
  const _id = useSelector(state => state.schedule.trainingDialog._id)
  const trainingQuery = useGetTrainingQuery(_id)
  const traineesAmount = trainingQuery.data?.training.traineesAmount
  const isFormActive = useSelector(state => state.schedule.trainingDialog.recordForm.isActive)

  const activate = React.useCallback(
    async () => {
      actions.schedule.trainingDialog.openCreateRecordForm()
    },
    [actions]
  )

  const disabled = React.useMemo(
    () => {
      return (!traineesAmount || trainingQuery?.data?.trainingRecords.length! >= traineesAmount)
    }, [trainingQuery, traineesAmount]
  )

  return (
    <Grid container={true} spacing={3}>
      <Grid item={true} lg={4} className={classes.divider}>
        <List className={classes.list}>
          <ListItem button={true} onClick={activate} disabled={disabled}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <AddOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Добавить запись (${trainingQuery?.data?.trainingRecords.length}/${traineesAmount})`}
            />
          </ListItem>
          {
            trainingQuery?.data?.trainingRecords.map((r, index) => (
              <RecordItem key={r._id} id={r._id!} />
            ))
          }
        </List>
      </Grid>
      {
        isFormActive && (
          <RecordForm />
        )
      }
    </Grid>
  )
}
