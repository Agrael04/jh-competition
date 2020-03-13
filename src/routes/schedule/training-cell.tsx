import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useActions } from '../../store'

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell'

import TrainingItem from './components/training-item'

import PersonAddIcon from '@material-ui/icons/PersonAdd'

import Tooltip from '../../components/multiline-tooltip'

import GET_TRAINING from './queries/get-training'
import { GetTrainingQuery } from 'generated/graphql'

import getColorPallete from 'utils/get-color-pallete'

const RecordCell = ({ time, resource, id }: any) => {
  const actions = useActions()

  const { data, loading } = useQuery<GetTrainingQuery>(GET_TRAINING, {
    variables: { id },
    skip: !id,
  })

  const training = data?.training
  const records = data?.trainingRecords

  const handleDoubleClick = React.useCallback(
    e => {
      e.stopPropagation()
      actions.schedule.openCreateDialog({ resource, time })
    },
    [actions, resource, time]
  )

  const color = React.useMemo(
    () => {
      if (loading || training?.trainer === null || training?.trainer === undefined) {
        return getColorPallete(undefined)
      }

      return getColorPallete(training.trainer)
    },
    [loading, training]
  )

  const backgroundStyle = React.useMemo(
    () => ({ backgroundColor: color[500] }),
    [color]
  )

  const isOccupied = !loading && !!training

  return (
    <TableCell align='center' padding='none' style={isOccupied ? backgroundStyle : undefined}>
      {
        loading && (
          <CircularProgress />
        )
      }
      {
        !loading && !training && (
          <Button onDoubleClick={handleDoubleClick} fullWidth={true}>
            <Tooltip rows={['Добавить тренировку']}>
              <PersonAddIcon />
            </Tooltip>
          </Button>
        )
      }
      {
        !loading && training && (
          <TrainingItem training={training as any} records={records as any} />
        )
      }
    </TableCell>
  )
}

export default RecordCell
