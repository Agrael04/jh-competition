import React from 'react'

import { useSelector, useActions } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import PositionForm from './position-form'
import PositionItem from './position-item'

import useStyles from './styles'

export default function TrainingDialog() {
  const actions = useActions()
  const openCreatePositionForm = actions.checkDialog.openCreatePositionForm
  const classes = useStyles()
  const isFormActive = useSelector(state => state.checkDialog.positionForm.isActive)

  const { data } = useGetContactDetailsQuery()

  const openAddForm = React.useCallback(
    () => {
      openCreatePositionForm()
    },
    [openCreatePositionForm]
  )

  if (isFormActive) {
    return (
      <PositionForm />
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
          data?.checkPositions.map((position, index) => (
            <PositionItem position={position} index={index} key={position._id} />
          ))
        }
      </List>
    </div>
  )
}
