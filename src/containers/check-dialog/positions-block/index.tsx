import { useDispatch, useSelector } from 'store'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import { openCreatePositionForm } from 'store/ui/dialogs/check-dialog/actions'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import PositionForm from './position-form'
import PositionItem from './position-item'

import useStyles from './styles'

export default function TrainingDialog() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const isFormActive = useSelector(state => state.ui.dialogs.checkDialog.positionForm.isActive)

  const { data } = useGetContactDetailsQuery()

  const openCreateForm = () => {
    dispatch(openCreatePositionForm({
      priceType: 'money' as const,
    }))
  }

  if (isFormActive) {
    return (
      <PositionForm />
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
            primary='Добавить позицию'
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
