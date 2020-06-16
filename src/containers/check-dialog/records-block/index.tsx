import React from 'react'
import { useSelector, useActions } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import useGetContactDetailsQuery from '../graphql/get-contract-details'

import PositionForm from './position-form'
import PositionItem from './position-item'
import RecordForm from './record-form'
import RecordItem from './record-item'

import useStyles from './styles'

export default function TrainingDialog() {
  const classes = useStyles()
  const actions = useActions()
  const isRecordFormActive = useSelector(state => !!state.checkDialog.recordForm)
  const isServiceFormActive = useSelector(state => !!state.checkDialog.positionForm)

  const { data } = useGetContactDetailsQuery()

  const openAddForm = React.useCallback(
    () => actions.checkDialog.openPosition(),
    [actions]
  )

  if (isServiceFormActive) {
    return (
      <PositionForm />
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
            primary={`Добавить позицию`}
          />
        </ListItem>
        {
          data?.trainingRecords.map((record, index) => (
            <RecordItem record={record} index={index} key={record._id} />
          ))
        }
        {
          data?.checkPositions.map((position, index) => (
            <PositionItem position={position} index={index} key={position._id} />
          ))
        }
      </List>
    </div>
  )
}
