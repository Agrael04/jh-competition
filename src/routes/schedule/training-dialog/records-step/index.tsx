import { useSelector, useDispatch } from 'store'

import Grid from '@material-ui/core/Grid'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AddOutlined from '@material-ui/icons/AddOutlined'

import { openCreateRecordForm } from 'store/ui/pages/schedule/training-dialog/actions'
import { selectTrainingId, selectIsRecordFormActive } from 'store/ui/pages/schedule/training-dialog/selectors'

import RecordItem from './record-item'
import RecordForm from './record-form'

import { useReadTrainingResourceById } from '../../queries/get-training-resource'

import useStyles from './styles'

export default function ResourcesBlock() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const _id = useSelector(selectTrainingId)
  const readTraining = useReadTrainingResourceById()
  const training = readTraining(_id)
  const isFormActive = useSelector(selectIsRecordFormActive)

  const activate = () => dispatch(openCreateRecordForm())

  if (isFormActive) {
    return (
      <Grid
        item={true}
        lg={12}
        className={classes.divider}
        container={true}
        spacing={3}
        justify='space-between'
        direction='column'
      >
        <RecordForm />
      </Grid>
    )
  }

  return (
    <Grid item={true} lg={12} className={classes.divider}>
      <List className={classes.list}>
        <ListItem button={true} onClick={activate}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <AddOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary='Добавить запись'
          />
        </ListItem>
        {
          training?.trainingRecords?.map((r) => (
            <RecordItem key={r._id} id={r._id!} />
          ))
        }
      </List>
    </Grid>
  )
}
