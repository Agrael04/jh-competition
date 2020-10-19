import React, { useMemo, useCallback } from 'react'

import { useActions, useSelector } from 'store'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'

import FilterListIcon from '@material-ui/icons/FilterList'

import useGetGymsQuery from '../queries/get-gyms'

const Header = () => {
  const actions = useActions()

  const gyms = useGetGymsQuery()
  const filters = useSelector(state => state.schedule.page.filters)

  const startFilterEditing = useCallback(
    () => {
      actions.schedule.page.startFiltersUpdate()
    }, [actions]
  )

  const filterChips = useMemo(
    () => {
      const chips = []

      if (filters.date) {
        chips.push(filters.date.format('MMMM Do'))
      }

      if (filters.gym) {
        chips.push(gyms.data?.gyms.find(g => g._id === filters.gym?.link!)?.name)
      }

      filters.resources.forEach(r => {
        chips.push(gyms.data?.resources.find(res => res._id === r)?.name)
      })

      return chips
    }, [filters, gyms]
  )

  React.useEffect(
    () => {
      if (!gyms.loading) {
        const _id = gyms.data?.gyms[0]._id!
        actions.schedule.page.setFilters({
          gym: { link: _id },
          resources: gyms.data?.resources.filter(r => r.gym._id === _id).map(r => r._id) || [],
        })
      }
    }, [gyms, actions]
  )

  return (
    <Toolbar>
      <Grid container={true} justify='space-between'>
        <Grid item={true} lg={9}>
          <Grid container={true}>
            <IconButton color='primary' onClick={startFilterEditing}>
              <FilterListIcon />
            </IconButton>
            {
              filterChips.map(filter => (
                <Box marginLeft={1} marginY={'auto'} key={filter}>
                  <Chip
                    color='primary'
                    label={filter}
                    onClick={startFilterEditing}
                  />
                </Box>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default Header
