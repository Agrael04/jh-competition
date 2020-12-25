import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'store'

import ButtonBase from '@material-ui/core/ButtonBase'
import Zoom from '@material-ui/core/Zoom'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import { openCreateTrainingDialog } from 'store/ui/pages/schedule/page/actions'

import getColorPallete from 'utils/get-color-pallete'

import useGetSchedulesQuery from '../../queries/get-schedules'
import { useTrainingDrop } from './dnd'

import useStyles from './styles'

interface IProps {
  time: number
  resource: string
}

const EmptyItem = ({ time, resource }: IProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const filters = useSelector(state => state.ui.pages.schedule.page.filters)

  const { data } = useGetSchedulesQuery(filters.date.toDate())

  const trainers = useMemo(
    () => {
      const trainers = data?.trainerSchedules
        .filter(ts => {
          if (ts.gym._id !== filters.gym) {
            return false
          }

          if (ts.time !== time) {
            return false
          }

          return true
        }).map(ts => ts.trainer)

      return trainers
    },
    [data, time, filters]
  )

  const handleCreateClick = useCallback(
    e => {
      e.stopPropagation()
      dispatch(openCreateTrainingDialog(resource, time))
    },
    [resource, time]
  )

  const [draggedItem, drop] = useTrainingDrop(time, resource)

  const backgroundStyle = useMemo(
    () => {
      if (!draggedItem.isOver) {
        return undefined
      }

      const duration = draggedItem.duration

      return ({
        backgroundColor: getColorPallete(draggedItem.color)[200],
        zIndex: 1,
        height: `calc(${duration}00% + ${(duration - 1) * 2}px)`,
        pointerEvents: 'none' as const,
      })
    },
    [draggedItem]
  )

  return (
    <div className={classes.resource} ref={drop}>
      <Zoom in={true}>
        <ButtonBase onDoubleClick={handleCreateClick} className={classes.button}>
          <div className={classes.cellWrap} style={backgroundStyle} />
          <Box paddingX={1}>
            <Grid container={true} spacing={1}>
              {
                trainers?.map(tr => (
                  <Grid item={true} key={tr._id}>
                    <Box width={12} height={12} borderRadius='50%' style={{ background: getColorPallete(tr.color)?.[200] }} />
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </ButtonBase>
      </Zoom>
    </div>
  )
}

export default EmptyItem
