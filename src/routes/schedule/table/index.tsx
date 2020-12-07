import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'

import times from 'data/times'

import HeaderRow from './header-row'
import TimeRow from './time-row'
import LastTimeRow from './last-time-row'

import useStyles from './styles'

export default function TrainingsTable() {
  const classes = useStyles()

  return (
    <div className={classes.wrap}>
      <Table stickyHeader={true}>
        <TableHead>
          <HeaderRow />
        </TableHead>
        <TableBody>
          {
            times
              .filter((time, index, arr) => index < arr.length - 1)
              .map((time, index) => (
                <TimeRow key={time.id} time={time} index={index} />
              ))
          }
          <LastTimeRow />
        </TableBody>
      </Table>
    </div>
  )
}

