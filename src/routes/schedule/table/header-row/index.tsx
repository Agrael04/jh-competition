import { useMemo } from 'react'

import TableRow from '@material-ui/core/TableRow'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Tooltip from 'components/multiline-tooltip'

import TableCell from '../table-cell'

import useGetGymsQuery from '../../queries/get-gyms'

import { useSelector } from 'store'

import useStyles from '../styles'

export default function HeaderRow() {
  const classes = useStyles()

  const gyms = useGetGymsQuery()
  const activeResources = useSelector(state => state.schedule.page.filters.resources)

  const resources = useMemo(
    () => {
      if (!gyms.data) {
        return []
      }

      return activeResources
        .map(r => gyms.data?.resources.find(res => res._id === r)!)
    }, [gyms, activeResources]
  )


  return (
    <TableRow>
      <TableCell className={classes.timeTd} secondaryRow={true}>
        <Typography>
          Время
        </Typography>
      </TableCell>
      {/* <TrainerHeaderCell /> */}
      {
        resources
          .map((r, resourseIndex) => (
            <TableCell key={r._id} align='center' padding='none' secondaryRow={true} secondaryCol={resourseIndex === 0} primaryCol={resourseIndex > 0}>
              <Button>
                <Tooltip rows={[r.name]}>
                  <Avatar className={classes.avatarBackground}>
                    {r.shortName}
                  </Avatar>
                </Tooltip>
              </Button>
            </TableCell>
          ))
      }
      {resources.length === 0 && <TableCell secondaryRow={true} secondaryCol={true} />}
    </TableRow>
  )
}
