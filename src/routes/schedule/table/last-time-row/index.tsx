import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import times from 'data/times'

import TableCell from '../table-cell'

import { useSelector } from 'store'

import useStyles from '../styles'

const time = times[times.length - 1]

const LastTimeRow = () => {
  const classes = useStyles()

  const activeResources = useSelector(state => state.ui.pages.schedule.page.filters.resources)

  return (
    <TableRow>
      <TableCell className={classes.timeTd} colSpan={2 + activeResources.length}>
        <Typography>
          {time.label}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default LastTimeRow
