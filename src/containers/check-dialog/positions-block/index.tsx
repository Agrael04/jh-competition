import React, { useCallback } from 'react'
import moment from 'moment'

import { useActions, useSelector } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import useGetContactDetailsQuery from '../graphql/get-contact-details'
import useCreatePosition from '../graphql/create-check-position'
import useUpdatePosition from '../graphql/update-check-position'

import PositionForm, { IPositionForm } from './position-form'
import PositionItem from './position-item'

import useStyles from './styles'

export default function TrainingDialog() {
  const classes = useStyles()
  const contact = useSelector(state => state.checkDialog.params.contact)!
  const date = useSelector(state => state.checkDialog.params.activeDate)!
  const gym = useSelector(state => state.checkDialog.params.activeGym)!

  const actions = useActions()
  const positionForm = useSelector(state => state.checkDialog.positionForm)

  const { data } = useGetContactDetailsQuery()
  const createPosition = useCreatePosition()
  const updatePosition = useUpdatePosition()

  const openCreateForm = useCallback(
    () => {
      actions.checkDialog.openPositionForm(null, {
        priceType: 'money' as const,
      })
    },
    [actions]
  )

  const submit = useCallback(
    async (values: IPositionForm) => {
      if (positionForm._id) {
        await updatePosition(positionForm._id, values)
      } else {
        await createPosition({
          contact,
          date: moment(date).toDate(),
          gym: { link: gym },
          ...values,
        })
      }

      actions.checkDialog.closePositionForm()
    }, [createPosition, updatePosition, actions, positionForm, date, gym, contact]
  )

  if (positionForm.active) {
    return (
      <PositionForm
        defaultValues={positionForm.defaultValues}
        submit={submit}
      />
    )
  }

  return (
    <div>
      <List>
        <ListItem button={true} onClick={openCreateForm}>
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
            <PositionItem
              index={index}
              key={position._id}
              id={position._id}
            />
          ))
        }
      </List>
    </div>
  )
}
