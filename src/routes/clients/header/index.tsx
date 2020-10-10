import React, { useCallback } from 'react'
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
              filters.visitedAt && (
                <Box marginLeft={2} marginY='auto'>
                  <Chip
                    label={`Последние посещение: ${moment(filters.visitedAt).format('MMMM YYYY')}`}
                    onClick={startFilterEditing}
                  />
                </Box>
              )
            }
            {
              filters.withDebt && (
                <Box marginLeft={2} marginY='auto'>
                  <Chip
                    label={`С долгом`}
                    onClick={startFilterEditing}
                  />
                </Box>
              )
            }
            {
              filters.age && (
                <Box marginLeft={2} marginY='auto'>
                  <Chip
                    label={`Возраст: ${filters.age}`}
                    onClick={startFilterEditing}
                  />
                </Box>
              )
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
