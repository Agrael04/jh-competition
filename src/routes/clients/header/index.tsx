import { useMemo } from 'react'
import { useSelector, useDispatch } from 'store'
import moment from 'moment'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'

import FilterListIcon from '@material-ui/icons/FilterList'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { startFilterUpdate } from 'store/ui/pages/clients/page/actions'

interface IProps {
  openClientForm: () => void
}

const Header = ({ openClientForm }: IProps) => {
  const filters = useSelector(state => state.ui.pages.clients.page.filters)
  const dispatch = useDispatch()
  const editFilters = () => dispatch(startFilterUpdate())
  const openNewClientDialog = () => openClientForm()

  const filterChips = useMemo(
    () => {
      const chips = []

      if (filters.visitedAt) {
        chips.push(`Последние посещение: ${moment(filters.visitedAt).format('MMMM YYYY')}`)
      }

      if (filters.withDebt) {
        chips.push('С долгом')
      }

      if (filters.age) {
        chips.push(`Возраст: ${filters.age}`)
      }

      return chips
    }, [filters]
  )

  return (
    <Toolbar>
      <Grid container={true} justify='space-between'>
        <div>
          <Grid container={true} spacing={2}>
            <Grid item={true}>
              <IconButton color='primary' onClick={editFilters}>
                <FilterListIcon />
              </IconButton>
            </Grid>
            {
              filterChips.map(filter => (
                <Box marginLeft={1} marginY='auto' key={filter}>
                  <Chip
                    color='primary'
                    label={filter}
                    onClick={editFilters}
                  />
                </Box>
              ))
            }
          </Grid>
        </div>
        <IconButton color='primary' onClick={openNewClientDialog}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Toolbar>
  )
}

export default Header
