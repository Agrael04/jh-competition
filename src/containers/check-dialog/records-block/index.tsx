import React from 'react'
import { useSelector, useActions } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import useGetContactDetailsQuery from '../graphql/get-contract-details'

import ServiceForm from './service-form'
import RecordForm from './record-form'
import RecordItem from './record-item'

import useStyles from './styles'

export default function TrainingDialog() {
  const classes = useStyles()
  const actions = useActions()
  const isRecordFormActive = useSelector(state => !!state.checkDialog.recordForm)
  const isServiceFormActive = useSelector(state => !!state.checkDialog.serviceForm)

  const { data } = useGetContactDetailsQuery()

  const openAddForm = React.useCallback(
    () => actions.checkDialog.openService(),
    [actions]
  )

  if (isServiceFormActive) {
    return (
      <ServiceForm />
    )
  }

  if (isRecordFormActive) {
    return (
      <RecordForm />
    )
  }

  return (
    <div>
      <List>
        <ListItem button={true} onClick={openAddForm}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <AddOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Добавить услугу`}
          />
        </ListItem>
        {
          data?.trainingRecords.map((record, index) => (
            <RecordItem record={record} index={index} key={record._id} />
          ))
        }
      </List>
    </div>
  )
}
