import React, { useMemo, useCallback, useEffect } from 'react'
import uniqBy from 'lodash/uniqBy'

import { useActions, useSelector } from 'store'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'

import FilterListIcon from '@material-ui/icons/FilterList'
import AddIcon from '@material-ui/icons/AddCircle'

import getColorPallete from 'utils/get-color-pallete'

import useGetGymsQuery from '../queries/get-gyms'
import useGetSchedulesQuery from '../queries/get-schedules'

const Header = () => {
  const actions = useActions()

  const gyms = useGetGymsQuery()
  const filters = useSelector(state => state.schedule.page.filters)
  const { data } = useGetSchedulesQuery(filters.date.toDate())

  const openTrainerScheduleDialog = actions.schedule.page.openAddTrainerDialog

  const startFilterEditing = useCallback(
    () => {
      actions.schedule.page.startFiltersUpdate()
    }, [actions]
  )

  const trainers = useMemo(
    () => {
      const trainers = data?.trainerSchedules
        .filter(ts => {
          if (ts.gym._id !== filters.gym) {
            return false
          }

          return true
        }).map(ts => ts.trainer)

      return uniqBy(trainers, tr => tr._id)
    },
    [data, filters]
  )

  const filterChips = useMemo(
    () => {
      const chips = []

      if (filters.date) {
        chips.push(filters.date.format('MMMM Do'))
      }

      if (filters.gym) {
        chips.push(gyms.data?.gyms.find(g => g._id === filters.gym)?.name)
      }

      return chips
    }, [filters, gyms]
  )

  useEffect(
    () => {
      if (!gyms.loading) {
        const _id = gyms.data?.gyms[0]._id!
        actions.schedule.page.setFilters({
          gym: _id,
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
                <Box marginLeft={1} marginY='auto' key={filter}>
                  <Chip
                    color='primary'
                    label={filter}
                    onClick={startFilterEditing}
                  />
                </Box>
              ))
            }
            {
              trainers.map(trainer => (
                <Box marginLeft={1} marginY='auto' key={trainer._id}>
                  <Chip
                    color='primary'
                    label={`${trainer.lastName} ${trainer.firstName}`}
                    style={{ backgroundColor: getColorPallete(trainer.color)[500] }}
                  />
                </Box>
              ))
            }
            <Box marginLeft={1} marginY='auto'>
              <Chip
                icon={<AddIcon />}
                color='primary'
                variant='outlined'
                label='Добавить тренера'
                onClick={openTrainerScheduleDialog}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default Header
