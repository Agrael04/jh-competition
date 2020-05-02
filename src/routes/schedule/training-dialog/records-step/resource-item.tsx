import React from 'react'
import { useSelector, useActions } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'

import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import times from 'data/times'
import useGetTrainingQuery from '../../queries/get-training'

import RecordItem from './record-item'

import useStyles from './styles'

interface IProps {
  id: string
}

export default function ResourceItem({ id }: IProps) {
  const classes = useStyles()
  const [opened, setOpened] = React.useState(false)

  const { isActive, trainingForm } = useSelector(state => ({
    trainingForm: state.schedule.trainingDialog.trainingForm,
    isActive: state.schedule.trainingDialog.resourceForm?._id === id,
  }))
  const trainingQuery = useGetTrainingQuery(trainingForm._id)

  const resource = trainingQuery?.data?.trainingResources.find(r => r._id === id)

  const label = React.useMemo(
    () => {
      const st = times.find(t => t.id === resource?.startTime)?.label
      const et = times.find(t => t.id === resource?.endTime)?.label
      const trainer = resource?.trainer
      const trainerLabel = trainer ? `${trainer.firstName} ${trainer.lastName},` : ''

      return `${trainerLabel} ${st} - ${et}`
    },
    [resource]
  )

  const toggleOpened = React.useCallback(
    () => {
      setOpened(s => !s)
    }, [setOpened]
  )

  return (
    <>
      <Divider />
      <ListItem button={true} onClick={toggleOpened} selected={isActive}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <FitnessCenterIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${resource?.resource.name}, ${label}`}
          secondary={'Записи: ' + trainingQuery?.data?.trainingRecords.filter(record => record.resource._id === id).length}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={toggleOpened}>
            {
              opened
                ? <KeyboardArrowUpIcon />
                : <KeyboardArrowDownIcon />
            }
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={opened}>
        <Box paddingLeft={7}>
          <List>
            {
              trainingQuery?.data?.trainingRecords
                .filter(record => record.resource._id === id)
                .map(r => (
                  <RecordItem key={r._id} id={r._id!} />
                ))
            }
          </List>
        </Box>
      </Collapse>
    </>
  )
}
