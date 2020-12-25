import { useMemo } from 'react'

import Skeleton from '@material-ui/lab/Skeleton'

import TableCell from '../table-cell'

import useGetTrainingResourceQuery from '../../queries/get-training-resource'

import TrainingItem from './training-item'
import EmptyItem from './empty-item'

import { useSelector } from 'store'

import useStyles from './styles'

interface IProps {
  time: number
  resource: string
  secondaryRow?: boolean
}

const TrainingCell = ({ time, resource, secondaryRow }: IProps) => {
  const classes = useStyles()
  const activeTime = useSelector(state => state.ui.pages.schedule.page.activeTime)
  const { data, loading } = useGetTrainingResourceQuery(time, resource)

  const duration = useMemo(
    () => {
      const startTime = data?.trainingResource?.startTime || 0
      const endTime = data?.trainingResource?.endTime || 0

      return (endTime - startTime) || 1
    },
    [data]
  )

  const isOccupied = useMemo(
    () => {
      if (!data || !data?.trainingResource) {
        return false
      }

      return data?.trainingResource?.startTime !== time
    },
    [data, time]
  )

  return (
    <TableCell
      align='center'
      padding='none'
      className={classes.resourceTd}
      primaryCol={!secondaryRow}
      secondaryCol={secondaryRow}
      primaryRow={time % 2 === 0}
      activeRow={time + 1 === activeTime}
    >
      {
        (isOccupied || loading) && (
          <div className={classes.cellWrap}>
            <Skeleton variant='rect' height='100%' />
          </div>
        )
      }
      {
        !isOccupied && !loading && data?.trainingResource?._id && (
          <div
            className={classes.cellWrap}
            style={{
              height: `calc(${duration * 100}% + ${(duration - 1) * 2}px)`,
              zIndex: 1,
            }}
          >
            <TrainingItem time={time} resource={resource} />
          </div>
        )
      }
      {
        !isOccupied && !loading && !data?.trainingResource?._id && (
          <div className={classes.cellWrap}>
            <EmptyItem time={time} resource={resource} />
          </div>
        )
      }
    </TableCell>
  )
}

export default TrainingCell
