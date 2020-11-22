import React, { useCallback, useMemo } from 'react'
import { useSelector, useActions } from 'store'
import moment from 'moment'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'

import FilterListIcon from '@material-ui/icons/FilterList'
import AddCircleIcon from '@material-ui/icons/AddCircle'

interface IProps {
  openClientForm: () => void
}

const Header = ({ openClientForm }: IProps) => {
  const filters = useSelector(state => state.clients.page.filters)
  const actions = useActions()
  const startFilterEditing = useCallback(
    () => {
      actions.clients.page.startFilterUpdate()
    }, [actions]
  )

  const openNewClientDialog = useCallback(
    () => {
      openClientForm()
    }, [openClientForm]
  )

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
              <IconButton color='primary' onClick={startFilterEditing}>
                <FilterListIcon />
              </IconButton>
            </Grid>
            {
              filterChips.map(filter => (
                <Box marginLeft={1} marginY='auto' key={filter}>
                  <Chip
                    color='primary'
                    label={filter}
                    onClick={startFilterEditing}
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
